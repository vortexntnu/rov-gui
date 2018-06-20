import * as types from './actionTypes';

export function receivePressure(newPressure) {
    return {type: types.SET_ROS, ros: newPressure}
}
