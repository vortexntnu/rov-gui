import React from 'react';
import './RosError.css'

function RosError() {
    return (
        <div id='ros-error'>
            <div>
                <h1>The ROV is not connected!</h1>
                <p>The GUI receives no "still-alive"-pings from the ROV</p>
            </div>
        </div>
    )
}

export default RosError;