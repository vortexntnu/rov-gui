import React, {Component} from 'react';
import './AircraftIdTab.css';
import ROSLIB from 'roslib';

const A = <div id="aircraft-type" style={{color:"red"}}>A</div>;
const B = <div id="aircraft-type" style={{color:"yellow"}}>B</div>;
const C = <div id="aircraft-type" style={{color:"blue"}}>C</div>;
const D = <div id="aircraft-type" style={{color:"red"}}>D</div>;
const E = <div id="aircraft-type" style={{color:"yellow"}}>E</div>;
const F = <div id="aircraft-type" style={{color:"blue"}}>F</div>;
const Unknown = <div id="aircraft-type" style={{fontSize: 146}}>Unknown</div>;

class AircraftIdTab extends Component {
    constructor() {
        super();
        this.state = {type: null}
    }

    componentDidMount() {
        const ros = new ROSLIB.Ros({url: 'ws://localhost:9090'})

        this.typeTopic = new ROSLIB.Topic({
            ros: ros,
            name: 'aircraft_id/type',
            messageType: 'std_msgs/String'
        });

        this.typeTopic.subscribe(this.handleType);
    }

    handleType = (msg) => {
        this.setState({type: msg.data});
    };

    AircraftType = ({type}) => {
        if(type === null) {
            type = ""
        } else {
            type = type.toUpperCase();
        }

        switch(type) {
            case 'A': return A;
            case 'B': return B;
            case 'C': return C;
            case 'D': return D;
            case 'E': return E;
            case 'F': return F;
            default:  return Unknown;
        }
    };

    render() {
        const AircraftType = this.AircraftType;
        const type = this.state.type;
        return (
            <div id="aircraft-id-tab">
                <h1>I spot an aircraft of type...</h1>
                <AircraftType type={type}/>
            </div>
        )
    }
}

export default AircraftIdTab;