import * as types from './actionTypes';

export function setRos(newRos) {
    return {type: types.SET_ROS, ros: newRos}
}
