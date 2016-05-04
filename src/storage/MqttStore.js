import Paho from '../libs/mqttws31.js';
import SimpleStore from './SimpleStore.js';

export default class MqttStore extends SimpleStore {

    constructor(mqttOptions, callback) {
        super(callback);
        this.connected = false;
        this._mqttOptions = mqttOptions;
        this._subscription = {};
        this.client = new Paho.MQTT.Client(
            this._mqttOptions.server,
            Number(this._mqttOptions.port),
            "control-panel-"+Math.floor(Math.random()*10000)
        );

        this.client.onConnectionLost = (...rest) => {
            console.info('disconnected', error);
            this.connected = false;
            setTimeout(() => this.connect(), 1000);
        };
        this.client.onConnect = (...rest) => {
            this.onConnect.apply(this, rest);
        };

        this.client.onMessageArrived = (...rest) => {
            this.onMessageArrived.apply(this, rest);
        };

        this.send = _.debounce((key, value) => {
            console.log('sending', key, value);
            this.client.send(key, value);
        }, 500);
        
        this.connect();
    }

    set(key, value, send=true) {
        if (send) {
            this.send(key, value);
        }
        super.set(key, value);
    }

    connect() {
        let options = {
        };
        let validOptions = [
            'timeout', 'userName',
            'password', 'willMessage',
            'keepAliveInterval', 'cleanSession',
            'useSSL', 'invocationContext',
            'onSuccess', 'onFailure',
            'hosts', 'ports', 'mqttVersion'
        ];


        for (let option in this._mqttOptions) {
            if (this._mqttOptions.hasOwnProperty(option) && validOptions.indexOf(option) > -1) {
                options[option] = this._mqttOptions[option];
            }
        }

        options.onSuccess = (...rest) => {
            this.onConnect.apply(this, rest);
        };

        this.client.connect(options);
    }


    onConnect(){
        console.info('connected');
        console.log(this._subscription);
        this.connected = true;
        for (let topic in this._subscription) {
            if (this._subscription.hasOwnProperty(topic)) {
                console.log('subscribing to', topic);
                this.client.subscribe(topic);
            }
        }
    }

    onMessageArrived(msg){
        console.log('received message', msg.destinationName, msg.payloadString);
        this.set(msg.destinationName, msg.payloadString, false);
    }
    
    subscribe(key) {
        this._subscription[key] = true;
        super.subscribe(key);
        if (this.connected) {
            this.client.subscribe(key);
        }
    }


}