import Control from './controls/Control.js';

/**
 * Controls wrapper
 */
export default class Dashboard extends React.Component {
    
    render(){
        var store = this.props.store;
        return (
            <div className="dashboard">
                {
                    this.props.configuration.controls.map((control, index) => {
                        return <Control configuration={control} store={store} key={index}/>
                    })
                }
            </div>
        )
    }
}