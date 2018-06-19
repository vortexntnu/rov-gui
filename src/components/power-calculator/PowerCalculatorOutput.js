import React from 'react';
import './PowerCalculatorOutput.css';

/*
    n   = the number of turbines in the array
    vk  = the velocity of the water in knots
    d   = the diameter of the tubines
    cp  = the efficiency of the turbines
    p   = the power generated in MW
*/
function p(n, vk, d, cp) {

    // p = density of seawater in kg/m³
    const p = 1025;

    // a = swept area of one rotor in m²
    const a = Math.PI * Math.pow(d/2, 2);

    // v = velocity of the water in m/s
    const v = vk * 0.51444444444444;

    const w = n * 1/2*(p * a * Math.pow(v,3) * cp);

    return (w / 1000000).toFixed(2);
}

const PowerCalculatorOutput = ({values}) => {
    const {
        numberInput,
        velocityInput,
        diameterInput,
        efficiencyInput,
    } = values;

    const n = parseFloat(numberInput);
    const v = parseFloat(velocityInput);
    const d = parseFloat(diameterInput);
    const cp = parseFloat(efficiencyInput) / 100;

    if(
        isNaN(n) ||
        isNaN(v) ||
        isNaN(d) ||
        isNaN(cp)
    ) {
        console.log(n, v, d, cp);
        return <div id='power-calculator-output'>Fill in remaining fields</div>;
    } else {
        return <div id='power-calculator-output'>{p(n, v, d, cp)} MW</div>
    }
};

export default PowerCalculatorOutput;
