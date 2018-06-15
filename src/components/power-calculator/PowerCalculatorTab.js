import React, {Component} from 'react';
import {Tab} from 'semantic-ui-react';
import ValueInput from '../common/value-input/ValueInput';
import PowerCalculatorOutput from './PowerCalculatorOutput';
import './PowerCalculatorTab.css';

class PowerCalculatorTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberInput: "",
            velocityInput: "",
            diameterInput: "",
            efficiencyInput: "",
        }
    }

    onNumberChange = (event) => {
        this.setState({numberInput: event.target.value});
    };

    onVelocityChange = (event) => {
        this.setState({velocityInput: event.target.value});
    };

    onDiameterChange = (event) => {
        this.setState({diameterInput: event.target.value});
    };

    onEfficiencyChange = (event) => {
        this.setState({efficiencyInput: event.target.value});
    };

    render() {
        return (
            <Tab.Pane id='power-calculator'>
                <div className="left">
                    <h2>Input</h2>
                    <ValueInput
                        type='number'
                        label='Number of turbines:'
                        unit=' '
                        placeholder='e.g. 2, 7, 14, ...'
                        onChange={this.onNumberChange}
                    />
                    <ValueInput
                        type='number'
                        label='Water velocity:'
                        unit='knots'
                        placeholder='e.g. 9.5, 23.2, 54.2, ...'
                        onChange={this.onVelocityChange}
                    />
                    <ValueInput
                        type='number'
                        label='Diameter of turbines:'
                        unit='m'
                        placeholder='e.g. 0.34, 2.35, 5.98, ...'
                        onChange={this.onDiameterChange}
                    />
                    <ValueInput
                        type='number'
                        label='Efficiency:'
                        unit='%'
                        placeholder='e.g. 25, 36, 80, ...'
                        onChange={this.onEfficiencyChange}
                    />
                </div>
                <div className='right'>
                    <h2>Output</h2>
                    <PowerCalculatorOutput values={this.state}/>
                </div>
            </Tab.Pane>
        );
    }
}

export default PowerCalculatorTab;