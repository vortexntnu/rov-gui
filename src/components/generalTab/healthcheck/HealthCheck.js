import React, {Component} from 'react';
import HealthIndicator from "./HealthIndicator";

class HealthCheck extends Component {
    render() {
        return (
            <div id="healthCheck">
                <h3>Health check</h3>
                <HealthIndicator item="IMU"/>
                <HealthIndicator item="Manipulator"/>
            </div>
        )
    }
}

export default HealthCheck;