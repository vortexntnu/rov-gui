import {SET_ROS} from '../actions/actionTypes';
import initialState from './initialState';

function rosReducer(state = initialState.ros, action) {
    let newState;
    switch (action.type) {
        case SET_ROS:
            newState = action.ros;
            console.log('SET_ROS Action');
            return newState;
        default:
            return state;
    }
}

export default rosReducer;