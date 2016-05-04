import BaseControl from './BaseControl.js';

/**
 * Displays Text
 */
export default class SwitchControl extends BaseControl {

    render() {
        return (
            <div className="switchControl">
                {
                    this.configuration.options.map((option, index) => {
                        return (
                            <label key={index}>
                                <input
                                    name={this.configuration.label}
                                    type="radio"
                                    className="switch-control__value"
                                    onChange={() => this.value = option.value}
                                    value={option.value}/>
                                { option.label }
                            </label>
                        )
                    })
                }
                
            </div>
        );
    }
}