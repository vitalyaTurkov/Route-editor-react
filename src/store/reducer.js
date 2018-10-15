import {ADD_POINT_ACTION, DELETE_POINT_ACTION, SWAP_POINTS_ACTION } from "./action-types";

const initialState = [];

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POINT_ACTION:
            return [...state, action.point];

        case DELETE_POINT_ACTION:
            state.splice(state.indexOf(action.point), 1);
            return [...state];

        case SWAP_POINTS_ACTION:
            console.log(action);
            if(action.point1 === undefined || action.point2 === undefined) {
                return state;
            }

            let res1, res2;
            for(let i = 0; i < state.length; i++) {
                if(state[i].address === action.point1.address) {
                    res1 = i;
                }
                if(state[i].address === action.point2.address) {
                    res2 = i;
                }
            }
            state[res1] = action.point2;
            state[res2] = action.point1;

            return [...state];
        default:
            return state;
    }
};