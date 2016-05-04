

export default class BaseControl extends React.Component {

    componentDidMount() {
        this.subscribe();
    }

    componentWillUpdate() {
        this.subscribe();
    }

    subscribe() {
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