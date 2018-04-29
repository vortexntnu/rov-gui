const ROSLIB = require('roslib');

let x = 0;
let y = 0;

const ros = new ROSLIB.Ros({
    url: 'ws://localhost:9090'
});

const anglesTopic = new ROSLIB.Topic({
    ros: ros,
    name: 'obs/angles',
    messageType: 'geometry_msgs/Point'
});

const dataTopic = new ROSLIB.Topic({
    ros: ros,
    name: 'obs/data',
    messageType: 'std_msgs/Float64MultiArray'
});

const voltageTopic = new ROSLIB.Topic({
    ros: ros,
    name: 'obs/voltage',
    messageType: 'std_msgs/Float64'
});

setInterval(() => anglesTopic.publish(newPoint()), 100);
setInterval(() => dataTopic.publish(newList()), 5000);
setInterval(() => voltageTopic.publish({data: Math.random() * 5}), 5000);

function newPoint() {
    x = (x + Math.random() * 0.4 - 0.2) / 1.01;
    y = (y + Math.random() * 0.4 - 0.2) / 1.01;
    return {x: x, y: y};
}

function newList() {
    const floats = [];
    for(let i = 0; i < 16; i++) {
        floats.push(Math.random()*20 - 10);
    }
    return {data: floats}
}