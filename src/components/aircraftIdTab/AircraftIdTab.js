import React, {Component} from 'react';
import './AircraftIdTab.css';
import ROSLIB from 'roslib';

const A = <div style={{color:"red"}}>A</div>;
const B = <div style={{color:"yellow"}}>B</div>;
const C = <div style={{color:"blue"}}>C</div>;
const D = <div style={{color:"red"}}>D</div>;
const E = <div style={{color:"yellow"}}>E</div>;
const F = <div style={{color:"blue"}}>F</div>;
const Unknown = <div style={{fontSize: 146}}>Unknown</div>;

class AircraftIdTab extends Component {
    constructor() {
        super();
        this.state = {type: null}
    }

    componentDidMount() {
        const ros = new ROSLIB.Ros({url: 'ws://localhost:9090'});

        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: 'aircraft_id/type',
            messageType: 'std_msgs/String'
        });

        this.topic.subscribe(this.handleType);
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

    componentWillUnmount() {
        this.topic.unsubscribe();
    }

    render() {
        const AircraftType = this.AircraftType;
        const type = this.state.type;
        return (
            <div id="aircraft-id-tab">
                <h1>I spot an aircraft of type...</h1>
                <div id="aircraft-type" >
                    <AircraftType type={type}/>
                </div>
            </div>
        )
    }
}

export default AircraftIdTab;