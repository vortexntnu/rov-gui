import React from 'react';
import './SearchZoneOutput.css';

function cumulativeValue(t, a4, a3, a2, a1, a0) {
    return (a4/5)*Math.pow(t, 5) + (a3/4)*Math.pow(t, 4) + (a2/3)*Math.pow(t, 3) + (a1/2)*Math.pow(t, 2) + a0*t;
}

function calculateLanding({takeoffHeading, speedOnAscent, ascentRate, engineFailureTime, speedOnDescent, descentRate, windDirection/*, a4, a3, a2, a1, a0*/}) {
    const a4 = 0;
    const a3 = 0;
    const a2 = -1/720;
    const a1 = 0;
    const a0 = 25;
    const altitudeAtFailure = ascentRate * engineFailureTime;
    const descentTime = altitudeAtFailure / descentRate;
    const radiusAtFailure = speedOnAscent * engineFailureTime;

    const totalWindInfluence = cumulativeValue(descentTime, a4, a3, a2, a1, a0);

    const dropDistance = speedOnDescent * descentTime;

    const north = radiusAtFailure*Math.cos(takeoffHeading*Math.PI/180)
                + dropDistance*Math.cos(takeoffHeading*Math.PI/180)
                + totalWindInfluence*Math.cos((windDirection-180)*Math.PI/180);

    const east  = radiusAtFailure*Math.sin(takeoffHeading*Math.PI/180)
                + dropDistance*Math.sin(takeoffHeading*Math.PI/180)
                + totalWindInfluence*Math.sin((windDirection-180)*Math.PI/180);

    const radiusAtEnd = Math.sqrt(Math.pow(north, 2) + Math.pow(east, 2));

    let headingEnd = Math.atan2(east, north) * 180/Math.PI;
    if(headingEnd < 0) {
        headingEnd = headingEnd + 360;
    }

    return (
        <div id="search-zone-output">
            <p>Total distance: {radiusAtEnd.toFixed(0)} m</p>
            <p>Heading towards end: {headingEnd.toFixed(2)}&#176;</p>
        </div>
    );
}

function valuesAreValid(obj) {
    for (let val in obj) {
        if(isNaN(obj[val])) {
            return false
        }
    }
    return true
}

const SearchZoneOutput = ({values}) => {
    const {
        takeoffHeading,
        speedOnAscent,
        ascentRate,
        engineFailureTime,
        speedOnDescent,
        descentRate,
        windDirection
    } = values;
    const numberValues = {
        takeoffHeading: parseFloat(takeoffHeading),
        speedOnAscent: parseFloat(speedOnAscent),
        ascentRate: parseFloat(ascentRate),
        engineFailureTime: parseFloat(engineFailureTime),
        speedOnDescent: parseFloat(speedOnDescent),
        descentRate: parseFloat(descentRate),
        windDirection: parseFloat(windDirection),
        windEquation: "",
    };
    if(valuesAreValid(numberValues)) {
        return calculateLanding(numberValues)
    } else {
        return <div id="search-zone-output">Fill in remaining fields</div>;
    }
};

export default SearchZoneOutput;