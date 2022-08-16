import {
    ADD_FAVORITE_SPORT_EVENT_ACTION,
    ADD_TO_FAVORITES_ACTION, REMOVE_FAVORITE_SPORT_EVENT_ACTION, REMOVE_FROM_FAVORITES_ACTION,
    SET_IS_AUTH_ACTION,
    SET_LOCATION,
    SET_PROFILE_ACTION,
    SET_USER_INFO_ACTION,
    TOGGLE_MEASURE_TYPE
} from "./actions";

const initialState = {
    user: {
        name: null,
        surname: null,
        email: null,
        password: null,
    },
    isAuth: false,
    darkMode: true,
    profileSettings: {
        isMetric: true,
        location: null,
    },
    favoriteCities: [],
    favoriteSportEvents: [],
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_INFO_ACTION:
            return {...state, user: action.user}
        case SET_IS_AUTH_ACTION:
            return {...state, isAuth: action.payload}
        case SET_PROFILE_ACTION:
            return action.profile
        case TOGGLE_MEASURE_TYPE:
            return {...state, profileSettings: {...state.profileSettings, isMetric: !state.profileSettings.isMetric}}
        case SET_LOCATION:
            return {...state, profileSettings: {...state.profileSettings, location: action.location}}
        case ADD_TO_FAVORITES_ACTION:
            return {...state, favoriteCities: [...state.favoriteCities, action.city]}
        case REMOVE_FROM_FAVORITES_ACTION:
            return {...state, favoriteCities: state.favoriteCities.filter(city => city !== action.city)};
        case ADD_FAVORITE_SPORT_EVENT_ACTION:
            return {...state, favoriteSportEvents: [action.sportEvent, ...state.favoriteSportEvents]}
        case REMOVE_FAVORITE_SPORT_EVENT_ACTION:
            return {...state, favoriteSportEvents: state.favoriteSportEvents.filter(sportEvent => sportEvent.id !== action.id)}
        default:
            return state
    }
}
