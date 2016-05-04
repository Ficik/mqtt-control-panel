

export default class BaseControl extends React.Component {


    componentWillUpdate() {
        this.store.subscribe(this.configuration.endpoint);
    }

    get store() {
        return this.props.store;
    }

    get configuration() {
        return this.props.configuration || {};
    }

    set value(value) {
        if (!this.props.store || !this.props.store.get) {
            return;
        }
        this.props.store.set(this.configuration.endpoint, value);
    }

    get value() {
        if (!this.props.store || !this.props.store.get) {
            return null;
        }
        return this.props.store.get(this.configuration.endpoint);
    }
}