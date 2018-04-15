import React, {Component} from 'react';
import {ScatterplotChart} from 'react-easy-chart';
import Rectangle from 'react-rectangle';

class BarChart extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.addEventListener('resize', this.changeWidth)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.changeWidth)
    }

    changeWidth = () => {

    };

    render() {
        return <Rectangle className="barchart" aspectRatio={[1, 1]}>
            <ScatterplotChart className="scatterplot"
                data = {this.data}
                axes
                axisLabels={{x: 'My x Axis', y: 'My y Axis'}}
            />
        </Rectangle>
    }
}

export default BarChart