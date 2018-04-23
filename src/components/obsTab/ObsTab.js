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
            data: [],
            voltage: null,
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

        this.dataTopic = new ROSLIB.Topic({
            ros: this.ros,
            name: 'obs/data',
            messageType: 'std_msgs/Float64MultiArray'
        });

        this.voltageTopic = new ROSLIB.Topic({
            ros: this.ros,
            name: 'obs/voltage',
            messageType: 'std_msgs/Float64'
        });

        this.anglesTopic.subscribe(this.anglesHandler);
        this.dataTopic.subscribe(this.dataHandler);
        this.voltageTopic.subscribe(this.voltageHandler);

        // TODO Remove this, just for demo
        this.anglesSpammer = setInterval(() => this.anglesTopic.publish(this.newPoint()), 100);
        this.dataSpammer = setInterval(() => this.dataTopic.publish(ObsTab.newList()), 5000);
        this.voltageSpammer = setInterval(() => this.voltageTopic.publish({data: Math.random() * 5}), 5000);
    }

    anglesHandler = (msg) => {
        this.setState({
            angles: {
                x: msg.x,
                y: msg.y,
            }
        });
    };

    dataHandler = (msg) => {
        const data = msg.data.map((float, index) => ({x: index+1, y: float}));
        this.setState({data: data});
    };

    voltageHandler = (msg) => {
        this.setState({voltage: msg.data});
    };

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
        this.voltageTopic.unsubscribe();

        // TODO Remove this, just for demo
        clearInterval(this.anglesSpammer);
        clearInterval(this.dataSpammer);
        clearInterval(this.voltageSpammer);
    }

    static safeGetAngle(value) {
        if(value == null) {
            return "No data"
        } else {
            return value.toFixed(2) + String.fromCharCode(176);
        }
    }

    static safeGetVoltage(value) {
        if(value == null) {
            return "No data"
        } else {
            return value.toFixed(3).toString() + " V"
        }
    }

    render() {
        const {angles, data, voltage} = this.state;
        return (
            <Grid id="obs-tab" celled>
                <Grid.Row columns={2}>
                    <Grid.Column width={6}>
                        <h1>OBS-level</h1>
                        <BubbleLevel angles={angles}/>
                        <div className="data-label">
                            <div>xAngle = </div>
                            <div>{ObsTab.safeGetAngle(angles.x)}</div>
                        </div>
                        <div className="data-label">
                            <div>yAngle = </div>
                            <div>{ObsTab.safeGetAngle(angles.y)}</div>
                        </div>
                        <div className="data-label">
                            <div>Voltage = </div>
                            <div>{ObsTab.safeGetVoltage(voltage, 3)}</div>
                        </div>
                    </Grid.Column>
                    <DataGrid width={10} data={data}/>
                </Grid.Row>
            </Grid>
        )
    }
}

export default ObsTab;