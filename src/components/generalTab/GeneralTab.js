import React from 'react';
import HealthCheck from './healthcheck/HealthCheck';
import {Grid} from 'semantic-ui-react'
import ROSLIB from 'roslib'

class General extends React.Component {
    constructor(props) {
        super(props);
        let ros = new ROSLIB.Ros({
            'url': 'ws://localhost:9090'
        });

        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: '/test1',
            messageType: 'std_msgs/String'
        });

        console.log(this.topic);

        this.topic.subscribe((message) => {
            console.log(message);
        });

    }

    render() {
        return (
            <Grid id="general-tab" celled>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <p>HALLA</p>
                    </Grid.Column>
                    <Grid.Column>
                        <p>HALLA</p>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <p>HALLA</p>
                    </Grid.Column>
                    <Grid.Column>
                        <HealthCheck ros={this.props.ros}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default General;