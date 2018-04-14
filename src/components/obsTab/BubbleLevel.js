import React from 'react';
import './BubbleLevel.css';
import {GoogleCharts} from 'google-charts';
import Rectangle from 'react-rectangle';

class General extends React.Component {

    componentWillMount() {
        GoogleCharts.load(this.chartSetup);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.drawChart);
    }

    chartSetup = () => {
        this.data = new GoogleCharts.api.visualization.DataTable();
        this.data.addColumn('number');
        this.data.addColumn('number');
        const radius = 5;
        for (let i = 0; i < 6.28; i += 0.1) {
            this.data.addRow([radius * Math.cos(i), radius * Math.sin(i)]);
        }
        this.drawChart();
        window.addEventListener('resize', this.drawChart)
    };

    drawChart = () => {
        const min = -5;
        const max = 5;

        const range = (min, max) => {
            let array = [];
            for (let i = min; i <= max; i++) {
                array.push(i);
            }
            return array;
        };

        const options = {
            legend: 'none',
            colors: ['#087037'],
            pointSize: 16,
            chartArea: {
                width: '90%',
                height: '90%',
            },
            hAxis: {
                viewWindow: {
                    min: min,
                    max: max,
                },
                ticks: range(min, max),
            },
            vAxis: {
                viewWindow: {
                    min: min,
                    max: max,
                },
                ticks: range(min, max),
            }
        };

        let chart = new GoogleCharts.api.visualization.ScatterChart(document.getElementById('chart'));
        chart.draw(this.data, options);

    };

    render() {
        return (
            <Rectangle id="bubble-level" aspectRatio={[1,1]}><div id="chart"/></Rectangle>
        )
    }
}

export default General;