import React, {Component} from 'react';
import './Depth.css';
import {Button} from 'semantic-ui-react';

const density = 1025;

function calculateDepth(pressure, offset) {
    console.log(pressure);
    if(pressure === null) {
        return 'Unknown'
    }
    return ((pressure - offset) / (density * 9.81)).toFixed(2) + ' m';
}

class Depth extends Component {
    constructor(props) {
        super(props);
        this.state = {offset: 0};
    }

    onSetOffset = () => {
        const {pressure} = this.props;
        if(pressure !== null) {
            this.setState({offset: pressure});
        }
    };

    render() {
        const {pressure} = this.props;
        const {offset} = this.state;
        const depth = calculateDepth(pressure, offset);

        return (
            <div className='depth'>
                <div>Depth:</div>
                <div>{depth}</div>
                <Button onClick={this.onSetOffset}>Reset</Button>
            </div>
        );
    }
}

export default Depth;