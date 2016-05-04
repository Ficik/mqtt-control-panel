import BaseControl from './BaseControl.js';

/**
 * Displays Text
 */
export default class TextControl extends BaseControl {

    render() {
        return (
            <div className="text-control">
                <input type="text"
                       className="text-control__value"
                       placeholder="No value"
                       value={this.textValue} onChange={(event) => this.value = event.target.value}/>
            </div>
        );
    }

    get textValue() {
        return this.value || "";
    }

}