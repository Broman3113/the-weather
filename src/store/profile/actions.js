export const SET_USER_INFO_ACTION = 'SET_USER_INFO_ACTION';
export const SET_IS_AUTH_ACTION = 'SET_IS_AUTH_ACTION';
export const SET_PROFILE_ACTION = 'SET_PROFILE_ACTION';
export const TOGGLE_MEASURE_TYPE = 'TOGGLE_MEASURE_TYPE';
export const SET_LOCATION = 'SET_LOCATION';
export const ADD_TO_FAVORITES_ACTION = "ADD_TO_FAVORITES_ACTION";
export const REMOVE_FROM_FAVORITES_ACTION = "REMOVE_FROM_FAVORITES_ACTION";

export const ADD_FAVORITE_SPORT_EVENT_ACTION = "ADD_FAVORITE_SPORT_EVENT_ACTION";
export const REMOVE_FAVORITE_SPORT_EVENT_ACTION = "REMOVE_FAVORITE_SPORT_EVENT_ACTION";

import { v4 as uuidv4 } from 'uuid';

export const setUserInfoAction = (user) => {
    return {
        type: SET_USER_INFO_ACTION,
        user: user
    }
}
export const setIsAuth = (value) => {
    return {
        type: SET_IS_AUTH_ACTION,
        payload: value
    }
}
export const setProfileAction = (profile) => {
    return {
        type: SET_PROFILE_ACTION,
        profile
    }
}
export const toggleMeasureType = () => {
    return {
        type: TOGGLE_MEASURE_TYPE,
        payload: "lol"
    }
}
export const setLocation = (location) => {
    return {
        type: SET_LOCATION,
        location
    }
}
export const addToFavorites = (city) => {
    return {
        type: ADD_TO_FAVORITES_ACTION,
        city
    }
}
export const removeFromFavorites = (city) => {
    return {
        type: REMOVE_FROM_FAVORITES_ACTION,
        city
    }
}

export const addFavoriteSportEvent = (sportEvent) => {
    console.log(sportEvent)
    return {
        type: ADD_FAVORITE_SPORT_EVENT_ACTION,
        sportEvent: {
            id: uuidv4(),
            ...sportEvent,
        }
    }
}
export const removeFavoriteSportEvent = (id) => {
    return {
        type: REMOVE_FAVORITE_SPORT_EVENT_ACTION,
        id
    }
}
