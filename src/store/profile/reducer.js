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
            const setUserInfoState = {...state, user: action.user}
            localStorage.profile = JSON.stringify(setUserInfoState)
            return setUserInfoState
        case SET_IS_AUTH_ACTION:
            const setIsAuthState = {...state, isAuth: action.payload}
            localStorage.profile = JSON.stringify(setIsAuthState)
            return setIsAuthState
        case SET_PROFILE_ACTION:
            const setProfileState = action.profile;
            localStorage.profile = JSON.stringify(setProfileState)
            return setProfileState
        case TOGGLE_MEASURE_TYPE:
            const toggleMeasureTypeState = {...state, profileSettings: {...state.profileSettings, isMetric: !state.profileSettings.isMetric}}
            localStorage.profile = JSON.stringify(toggleMeasureTypeState)
            return toggleMeasureTypeState
        case SET_LOCATION:
            const setLocationState = {...state, profileSettings: {...state.profileSettings, location: action.location}}
            localStorage.profile = JSON.stringify(setLocationState)
            return setLocationState
        case ADD_TO_FAVORITES_ACTION:
            const addToFavoritesState = {...state, favoriteCities: [...state.favoriteCities, action.city]}
            localStorage.profile = JSON.stringify(addToFavoritesState);
            return addToFavoritesState
        case REMOVE_FROM_FAVORITES_ACTION:
            const removeFromFavoritesState = {...state, favoriteCities: state.favoriteCities.filter(city => city !== action.city)}
            localStorage.profile = JSON.stringify(removeFromFavoritesState);
            return removeFromFavoritesState;
        case ADD_FAVORITE_SPORT_EVENT_ACTION:
            const addFavoriteSportEventState = {...state, favoriteSportEvents: [action.sportEvent, ...state.favoriteSportEvents]}
            localStorage.profile = JSON.stringify(addFavoriteSportEventState);
            return addFavoriteSportEventState;
        case REMOVE_FAVORITE_SPORT_EVENT_ACTION:
            const removeFavoriteSportEventState = {...state, favoriteSportEvents: state.favoriteSportEvents.filter(sportEvent => sportEvent.id !== action.id)}
            localStorage.profile = JSON.stringify(removeFavoriteSportEventState);
            return removeFavoriteSportEventState;
        default:
            return state
    }
}
