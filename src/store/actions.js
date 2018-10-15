import { ADD_POINT_ACTION, DELETE_POINT_ACTION, SWAP_POINTS_ACTION } from "./action-types";
import  {geocodeByAddress, getLatLng} from 'react-places-autocomplete';

const addPoint = (point) => {
    return {
        type: ADD_POINT_ACTION,
        point
    }
};

export const swapPoints = (point1, point2) => {
    return {
        type: SWAP_POINTS_ACTION,
        point1,
        point2
    }
};

export const deletePoint = (point) => {
    return {
        type: DELETE_POINT_ACTION,
        point
    }
};

export const addPointAsync = (address) => {
    return dispatch => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => dispatch(addPoint({ ...latLng, address })))
            .catch(error => console.error('Error', error));
    }
};