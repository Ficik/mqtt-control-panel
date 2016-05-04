import Dashboard from "./Dashboard.js";
import MqttStore from './storage/MqttStore.js';



fetch('/samples/all.json')
    .then((response) => response.json())
    .then((jsonData) => {
        console.log(jsonData);

        var update = function(store) {
            ReactDOM.render(
                <Dashboard configuration={jsonData} store={store} />,
                document.getElementById('content')
            );
        };

        window.store = new MqttStore({
            server: localStorage.getItem('MQTTServer') || '0.0.0.0',
            port: 9001
        }, update);
        update(window.store);
    });
