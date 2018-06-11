import React, {Component} from 'react';
import ValueInput from '../common/value-input/ValueInput';

/*
    n   = the number of turbines in the array
    vk  = the velocity of the water in knots
    d   = the diameter of the tubines
    cp  = the efficiency of the turbines
    p   = the power generated in watts
*/
function p(n, vk, d, cp) {

    // p = density of seawater in kg/m³
    const p = 1025;

    // a = swept area of one rotor in m²
    const a = d * Math.PI;

    // v = velocity of the water in m/s
    const v = vk * 0.51444444444444;

    return n * 1/2*(p * a * Math.pow(v,3) * cp);
}

class PowerCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberInput: "",
            velocityInput: "",
            diameterInput: "",
            efficiency: "",
        }
    }

    onNumberChange = (event) => {
        this.setState({numberInput: event.target.value});
    };
}

export default PowerCalculator;