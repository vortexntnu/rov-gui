import React, {Component} from 'react';
import './BubbleLevel.css'
import Measure from 'react-measure';
import {XYPlot, XAxis, YAxis, CircularGridLines, MarkSeries} from 'react-vis';
import ROSLIB from 'roslib';

class BubbleLevel extends Component {
    constructor() {
        super();
        this.state = {
            dimensions: {
                width: -1,
                height: -1,
            },
            angles: {
                x: 0,
                y: 0,
            }
        };

        this.margin = {
            top: 10,
            right: 10,
            bottom: 10,
            left: 10,
        };
    }

    componentDidMount() {
        this.ros = new ROSLIB.Ros({
            'url': 'ws://localhost:9090'
        });

        this.anglesTopic = new ROSLIB.Topic({
            ros: this.ros,
            name: 'obs/angles',
            messageType: 'geometry_msgs/Point'
        });

        this.anglesTopic.subscribe((msg) => {
            console.log(msg);
            this.setState({
                angles: {
                    x: msg.x,
                    y: msg.y,
                }
            });
        });

        this.spammer = setInterval(() => this.anglesTopic.publish(this.newPoint()), 100);
    }

    newPoint() {
        const x = (this.state.angles.x + Math.random() * 0.4 - 0.2) / 1.01;
        const y = (this.state.angles.y + Math.random() * 0.4 - 0.2) / 1.01;
        return {x: x, y: y};
    }

    componentWillUnmount() {
        this.anglesTopic.unsubscribe();
        clearInterval(this.spammer);
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
                                    data={[this.state.angles]}
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