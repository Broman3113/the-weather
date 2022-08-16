import {
    addFavoriteSportEvent,
    addToFavorites, removeFavoriteSportEvent,
    removeFromFavorites,
    setIsAuth, setLocation,
    setUserInfoAction,
    toggleMeasureType
} from "./actions";
import { v4 as uuidv4 } from 'uuid';

// do the same for setUserInfoAction, setIsAuthAction, setProfileAction, toggleMeasureTypeAction, setLocationAction, addToFavoritesAction, removeFromFavoritesAction, addFavoriteSportEventAction, removeFavoriteSportEventAction

export const setUserInfoThunk = (user) => {
    return dispatch => {
        dispatch(setUserInfoAction(user));
        const profile = JSON.parse(localStorage.profile);
        localStorage.profile = JSON.stringify({...profile, user: user});
    }
}
export const setIsAuthThunk = (value) => {
    return dispatch => {
        dispatch(setIsAuth(value));
        const profile = JSON.parse(localStorage.profile);
        localStorage.profile = JSON.stringify({...profile, isAuth: value});
    }
}
// export const setProfileThunk = (payload) => {
//     return dispatch => {
//         dispatch(setProfileAction(payload));
//         // localStorage.profile = JSON.stringify(payload);
//     }
// }
export const toggleMeasureTypeThunk = () => {
    return dispatch => {
        dispatch(toggleMeasureType());
        const profile = JSON.parse(localStorage.profile);
        localStorage.profile = JSON.stringify({...profile, profileSettings: {...profile.profileSettings, isMetric: !profile.profileSettings.isMetric}});
    }
}
export const setLocationThunk = (location) => {
    return dispatch => {
        dispatch(setLocation(location));
        const profile = JSON.parse(localStorage.profile);
        localStorage.profile = JSON.stringify({...profile, profileSettings: {...profile.profileSettings, location: location}});
    }
}
export const addToFavoritesThunk = (location) => {
    return dispatch => {
        dispatch(addToFavorites(location));
        const profile = JSON.parse(localStorage.profile);
        localStorage.profile = JSON.stringify({...profile, favoriteCities: [...profile.favoriteCities, location]});
    }
}
export const removeFromFavoritesThunk = (location) => {
    return dispatch => {
        dispatch(removeFromFavorites(location));
        const profile = JSON.parse(localStorage.profile);
        localStorage.profile = JSON.stringify({...profile, favoriteCities: profile.favoriteCities.filter(city => city !== location)});
    }
}
export const addFavoriteSportEventThunk = (sportEvent) => {
    return dispatch => {
        dispatch(addFavoriteSportEvent(sportEvent));
        const profile = JSON.parse(localStorage.profile);
        localStorage.profile = JSON.stringify({...profile, favoriteSportEvents: [{id: uuidv4(), ...sportEvent}, ...profile.favoriteSportEvents]});
    }
}
export const removeFavoriteSportEventThunk = (id) => {
    return dispatch => {
        dispatch(removeFavoriteSportEvent(id));
        const profile = JSON.parse(localStorage.profile);
        localStorage.profile = JSON.stringify({...profile, favoriteSportEvents: profile.favoriteSportEvents.filter(sportEvent => sportEvent.id !== id)});
    }
}
