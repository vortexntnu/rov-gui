import React, {Component} from 'react';
import './ObsTab.css';
import {Grid} from 'semantic-ui-react';
import BubbleLevel from './BubbleLevel';
import DataGrid from './DataGrid';
import ROSLIB from "roslib";

class ObsTab extends Component {
    constructor() {
        super();
        this.state = {
            angles: {
                x: null,
                y: null,
            },
            data: []
        };
    }

    componentDidMount() {
        this.ros = new ROSLIB.Ros({
            url: 'ws://localhost:9090'
        });

        this.anglesTopic = new ROSLIB.Topic({
            ros: this.ros,
            name: 'obs/angles',
            messageType: 'geometry_msgs/Point'
        });

        this.anglesTopic.subscribe((msg) => {
            this.setState({
                angles: {
                    x: msg.x,
                    y: msg.y,
                }
            });
        });

        this.dataTopic = new ROSLIB.Topic({
            ros: this.ros,
            name: 'obs/data',
            messageType: 'std_msgs/Float64MultiArray'
        });

        this.dataTopic.subscribe((msg) => {
            const data = msg.data.map((float, index) => ({x: index+1, y: float}));
            this.setState({
                data: data
            })
        });

        // TODO Remove this, just for demo
        this.anglesSpammer = setInterval(() => this.anglesTopic.publish(this.newPoint()), 10000);
        this.dataSpammer = setInterval(() => this.dataTopic.publish(ObsTab.newList()), 5000);
    }

    // TODO Remove this, just for demo
    newPoint() {
        const x = (this.state.angles.x + Math.random() * 0.4 - 0.2) / 1.01;
        const y = (this.state.angles.y + Math.random() * 0.4 - 0.2) / 1.01;
        return {x: x, y: y};
    }

    // TODO Remove this, just for demo
    static newList() {
        const floats = [];
        for(let i = 0; i < 16; i++) {
            floats.push(Math.random()*20 - 10);
        }
        return {data: floats}
    }

    componentWillUnmount() {
        this.anglesTopic.unsubscribe();
        this.dataTopic.unsubscribe();

        // TODO Remove this, just for demo
        clearInterval(this.anglesSpammer);
        clearInterval(this.dataSpammer);
    }

    static safeGetToFixed(value) {
        if(value == null) {
            return "No data"
        } else {
            return value.toFixed(2)
        }
    }

    render() {
        const angles = this.state.angles;
        const data = this.state.data;
        return (
            <Grid id="obs-tab" celled>
                <Grid.Row columns={2}>
                    <Grid.Column width={6}>
                        <h1>OBS-level</h1>
                        <BubbleLevel angles={angles}/>
                        <table id="angle-labels">
                            <tr>
                                <td>xAngle = </td>
                                <td>{ObsTab.safeGetToFixed(angles.x)}</td>
                            </tr>
                            <tr>
                                <td>yAngle = </td>
                                <td>{ObsTab.safeGetToFixed(angles.y)}</td>
                            </tr>
                        </table>
                    </Grid.Column>
                    <DataGrid width={10} data={data}/>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ObsTab;