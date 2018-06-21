import React, {Component} from 'react';
import './ThrusterScaling.css';
import ROSLIB from 'roslib';
import {Button, Input} from 'semantic-ui-react';

function ScalingInput({label, onChange}) {
    return (
        <div className='scaling-input'>
            <div className='scaling-label'>{label}:</div>
            <Input
                onChange={onChange}
                placeholder='0.00 - 1.00'
                type='number'
            />
        </div>
    )
}

function getScaling(str) {
    const val = parseFloat(str);
    if(isNaN(val)) return NaN;
    if(val < 0) return 0;
    if(val > 1) return 1;
    return val;
}

class ThrusterScaling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scaling: {
                x: NaN,
                y: NaN,
                z: NaN,
                yaw: NaN,
                pitch: NaN,
                roll: NaN,
            }
        };
        const ros = new ROSLIB.Ros({url: process.env.REACT_APP_ROSBRIDGE_URL});
        this.param = new ROSLIB.Param({
            ros: ros,
            name: '/propulsion/command/wrench/scaling',
        });
    }

    setParam = () => {
        this.param.get((vals) => {
            const {x, y, z, yaw, pitch, roll} = this.state.scaling;
            const guiVals = [x, y, z, yaw, pitch, roll];
            let newVals = [];
            for(let i = 0; i < vals.length; i++) {
                if(isNaN(guiVals[i])) {
                    newVals[i] = vals[i]
                } else {
                    newVals[i] = guiVals[i]
                }
            }
            this.param.set(newVals);
        });
    };

    onUpdateX = (event) => {
        let newState = this.state;
        newState.scaling.x = getScaling(event.target.value);
        this.setState(newState)
    };

    onUpdateY = (event) => {
        let newState = this.state;
        newState.scaling.y = getScaling(event.target.value);
        this.setState(newState)
    };

    onUpdateZ = (event) => {
        let newState = this.state;
        newState.scaling.z = getScaling(event.target.value);
        this.setState(newState)
    };

    onUpdateYaw = (event) => {
        let newState = this.state;
        newState.scaling.yaw = getScaling(event.target.value);
        this.setState(newState)
    };

    onUpdatePitch = (event) => {
        let newState = this.state;
        newState.scaling.pitch = getScaling(event.target.value);
        this.setState(newState)
    };

    onUpdateRoll = (event) => {
        let newState = this.state;
        newState.scaling.roll = getScaling(event.target.value);
        this.setState(newState)
    };

    render() {
        return (
            <div id='thruster-scaling'>
                <h3>Thruster-scaling</h3>
                <ScalingInput label='x' onChange={this.onUpdateX}/>
                <ScalingInput label='y' onChange={this.onUpdateY}/>
                <ScalingInput label='z' onChange={this.onUpdateZ}/>
                <ScalingInput label='yaw' onChange={this.onUpdateYaw}/>
                <ScalingInput label='pitch' onChange={this.onUpdatePitch}/>
                <ScalingInput label='roll' onChange={this.onUpdateRoll}/>
                <Button onClick={this.setParam}>SET</Button>
            </div>
        );
    }
}

export default ThrusterScaling;
