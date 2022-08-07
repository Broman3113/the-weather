import {applyMiddleware, combineReducers, createStore} from "redux";
import {usersReducer} from "./users/reducer";
import {profileReducer} from "./profile/reducer";
import {weatherReducer} from "./weather/reducer";
import {logger} from "../middleware/logger";
import thunk from "redux-thunk";
import {searchReducer} from "./search/reducer";
import {sportReducer} from "./sport/reducer";

const rootReducer = combineReducers({
    users: usersReducer,
    profile: profileReducer,
    weather: weatherReducer,
    search: searchReducer,
    sport: sportReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk, logger));
