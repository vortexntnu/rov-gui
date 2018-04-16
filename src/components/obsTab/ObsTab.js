import React from 'react';
import './ObsTab.css';
import {Grid} from 'semantic-ui-react';
import BubbleLevel from './BubbleLevel';
import ROSLIB from "roslib";

class General extends React.Component {
    constructor() {
        super();
        this.state = {
            angles: {
                x: 0,
                y: 0,
            }
        };
    }

    componentDidMount() {
        this.ros = new ROSLIB.Ros({
            'url': 'ws://localhost:9090'
        });

        this.anglesTopic = new ROSLIB.Topic({
            ros: this.ros,
            name: 'obs/angles',
            messageType: 'geometry_msgs/Point'
        });

        this.anglesTopic.subscribe((msg) => {
            console.log(msg);
            this.setState({
                angles: {
                    x: msg.x,
                    y: msg.y,
                }
            });
        });

        // TODO Remove this, just a demo
        this.spammer = setInterval(() => this.anglesTopic.publish(this.newPoint()), 100);
    }

    // TODO Remove this, just a demo
    newPoint() {
        const x = (this.state.angles.x + Math.random() * 0.4 - 0.2) / 1.01;
        const y = (this.state.angles.y + Math.random() * 0.4 - 0.2) / 1.01;
        return {x: x, y: y};
    }

    componentWillUnmount() {
        this.anglesTopic.unsubscribe();

        // TODO Remove this, just a demo
        clearInterval(this.spammer);
    }

    render() {
        return (
            <Grid id="obs-tab" celled>
                <Grid.Row columns={2}>
                    <Grid.Column width={6}>
                        <h1>OBS-level</h1>
                        <BubbleLevel angles={this.state.angles}/>
                        <div className="angle-info">xAngle = <div>{this.state.angles.x.toFixed(2)}</div></div>
                        <div className="angle-info">yAngle = <div>{this.state.angles.y.toFixed(2)}</div></div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <p>HALLA</p>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default General;