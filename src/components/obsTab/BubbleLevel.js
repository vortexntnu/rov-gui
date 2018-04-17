import React, {Component} from 'react';
import './BubbleLevel.css'
import Measure from 'react-measure';
import {XYPlot, XAxis, YAxis, CircularGridLines, MarkSeries} from 'react-vis';

class BubbleLevel extends Component {
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
                            id="bubble-level"
                            ref={measureRef}>
                            <XYPlot
                                margin={this.margin}
                                xDomain={[-3, 3]}
                                yDomain={[-3, 3]}
                                width={width}
                                height={width}>
                                <CircularGridLines/>
                                <XAxis top={(width) / 2}/>
                                <YAxis left={(width - this.margin.left - this.margin.right) / 2}/>
                                <MarkSeries
                                    strokeWidth={2}
                                    sizeRange={[5, 15]}
                                    data={[this.props.angles]}
                                />
                            </XYPlot>
                        </div>
                    )
                }}
            </Measure>
        )
    }
}

export default BubbleLevel;