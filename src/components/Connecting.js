import React from 'react';
import './Connecting.css';
import Logo from './../static/vortex.svg';

function Connecting() {
    return (
        <div id="connecting">
            <div>
                <h1>Connecting to ROS-bridge...</h1>
                <img src={Logo} width={400} height={400} alt="Vortex-logo"/>
            </div>
        </div>
    )
}

export default Connecting