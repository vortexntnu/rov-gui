import React, {Component} from 'react';
import Measure from 'react-measure';
import {XYPlot, XAxis, YAxis, LineSeries, VerticalGridLines, HorizontalGridLines} from 'react-vis';

class Seismograph extends Component {
    constructor() {
        super();
        this.state = {
            dimensions: {
                width: -1,
                height: -1,
            },
        };

        this.margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
        };
    }

    render() {
        const {width} = this.state.dimensions;

        return (
            <Measure
                bounds
                onResize={contentRect => this.setState({dimensions: contentRect.bounds})}>
                {({measureRef}) => {
                    return (
                        <div
                            ref={measureRef}>
                            <XYPlot height={width/3} width= {width}>
                                <LineSeries data={this.props.data} />
                                <VerticalGridLines />
                                <HorizontalGridLines />
                                <XAxis />
                                <YAxis />
                            </XYPlot>
                        </div>
                    )
                }}
            </Measure>
        )
    }
}

export default Seismograph;