import {SET_SPORT_EVENTS_FAILURE, SET_SPORT_EVENTS_REQUEST, SET_SPORT_EVENTS_SUCCESS} from "./actions";

const initialState = {
    sportEvents: {
        football: [],
        cricket: [],
        golf: [],
    },
    isSportEventsLoading: false,
    isSportEventsError: null,
}

export const sportReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SPORT_EVENTS_REQUEST:
            return {...state, isSportEventsLoading: true, isSportEventsError: null}
        case SET_SPORT_EVENTS_SUCCESS:
            return {...state, sportEvents: action.sportEvents, isSportEventsLoading: false}
        case SET_SPORT_EVENTS_FAILURE:
            return {...state, isSportEventsLoading: false, isSportEventsError: action.error}
        default:
            return state
    }
}
