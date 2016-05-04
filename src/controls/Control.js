import TextControl from './TextControl.js';
import SwitchControl from './SwitchControl.js';

/**
 * Control wrapper and factory
 */
export default class Control extends React.Component {

    render() {
        return (
            <div className="control">
                <div className="control__content-wrapper">
                    <h3 className="control__label">{ this.props.configuration.label }</h3>
                    <div className="control__content">
                    { this.renderControl(this.props.configuration) }
                    </div>
                </div>
            </div>
        );
    }

    renderControl(configuration){
        if (configuration.type === 'Text') {
            return <TextControl configuration={configuration} store={this.props.store} />;
        } else if (configuration.type === 'Switch') {
            return <SwitchControl configuration={configuration} store={this.props.store} />;
        } else {
            return <div>Unsupported Element { configuration.type }</div>
        }
    }

}