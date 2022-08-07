import {
    SET_WEATHER_DAY_TO_DISPLAY,
    SET_WEATHER_HISTORY_INFO_FAILURE,
    SET_WEATHER_HISTORY_INFO_REQUEST, SET_WEATHER_HISTORY_INFO_SUCCESS, SET_WEATHER_HISTORY_MANUALLY,
    SET_WEATHER_INFO_FAILURE,
    SET_WEATHER_INFO_REQUEST,
    SET_WEATHER_INFO_SUCCESS
} from "./actions";

const initialState = {
    weatherInfo: {
        location: {
            data: ""
        }
    },
    isWeatherInfoLoading: false,
    isWeatherInfoError: null,

    weatherHistoryInfo: {
        forecast: {
            forecastday: [
                {
                  day: {}
                },
            ]
        }
    },
    isWeatherHistoryInfoLoading: false,
    isWeatherHistoryInfoError: null,
    weatherDayToDisplay: 0,
}

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WEATHER_INFO_REQUEST:
            return {...state, isWeatherInfoLoading: true, isWeatherInfoError: null}
        case SET_WEATHER_INFO_SUCCESS:
            return {...state, weatherInfo: action.weatherInfo, isWeatherInfoLoading: false}
        case SET_WEATHER_INFO_FAILURE:
            return {...state, isWeatherInfoLoading: false, isWeatherInfoError: action.error}

        case SET_WEATHER_HISTORY_INFO_REQUEST:
            return {...state, isWeatherHistoryInfoLoading: true, isWeatherHistoryInfoError: null}
        case SET_WEATHER_HISTORY_INFO_SUCCESS:
            return {...state, weatherHistoryInfo: action.weatherHistoryInfo, isWeatherHistoryInfoLoading: false}
        case SET_WEATHER_HISTORY_INFO_FAILURE:
            return {...state, isWeatherHistoryInfoLoading: false, isWeatherHistoryInfoError: action.error}

        case SET_WEATHER_DAY_TO_DISPLAY:
            return {...state, weatherDayToDisplay: action.index}
        default:
            return state
    }
}
