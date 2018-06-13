import React, {Component} from 'react';
import './ControlMode.css';
import ROSLIB from 'roslib';
import {Form, Radio} from 'semantic-ui-react';

class ControlMode extends Component {
    constructor(props) {
        super(props);
        this.state = {mode: 'open-loop'};
        const ros = new ROSLIB.Ros({url: process.env.REACT_APP_ROSBRIDGE_URL});
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: '/work_in_progress',
            messageType: 'std_msgs/Float64',
        });
    }

    handleChange = (event, {value}) => {
        this.setState({mode: value});
    };

    render() {
        return (
            <Form>
                <h3>Control-mode</h3>
                <Form.Field>
                    <Radio
                        label='Open-loop'
                        name='radioGroup'
                        value='open-loop'
                        checked={this.state.mode === 'open-loop'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Heading-hold'
                        name='radioGroup'
                        value='heading-hold'
                        checked={this.state.mode === 'heading-hold'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label='Depth-hold'
                        name='radioGroup'
                        value='depth-hold'
                        checked={this.state.mode === 'depth-hold'}
                        onChange={this.handleChange}
                    />
                </Form.Field>
            </Form>
        )
    }
}

export default ControlMode;