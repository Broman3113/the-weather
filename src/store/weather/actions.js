export const SET_WEATHER_INFO_REQUEST = "SET_WEATHER_INFO_REQUEST";
export const SET_WEATHER_INFO_SUCCESS = "SET_WEATHER_INFO_SUCCESS";
export const SET_WEATHER_INFO_FAILURE = "SET_WEATHER_INFO_FAILURE";

export const SET_WEATHER_HISTORY_INFO_REQUEST = "SET_WEATHER_HISTORY_INFO_REQUEST";
export const SET_WEATHER_HISTORY_INFO_SUCCESS = "SET_WEATHER_HISTORY_INFO_SUCCESS";
export const SET_WEATHER_HISTORY_INFO_FAILURE = "SET_WEATHER_HISTORY_INFO_FAILURE";

export const SET_WEATHER_DAY_TO_DISPLAY = "SET_WEATHER_DAY_TO_DISPLAY";

export const setWeatherInfoRequest = () => {
    return {
        type: SET_WEATHER_INFO_REQUEST,
    }
}
export const setWeatherInfoSuccess = (weatherInfo) => {
    return {
        type: SET_WEATHER_INFO_SUCCESS,
        weatherInfo
    }
}
export const setWeatherInfoFailure = (error) => {
    return {
        type: SET_WEATHER_INFO_FAILURE,
        error
    }
}

export const setWeatherHistoryInfoRequest = () => {
    return {
        type: SET_WEATHER_HISTORY_INFO_REQUEST,
    }
}
export const setWeatherHistoryInfoSuccess = (weatherHistoryInfo) => {
    return {
        type: SET_WEATHER_HISTORY_INFO_SUCCESS,
        weatherHistoryInfo
    }
}
export const setWeatherHistoryInfoFailure = (error) => {
    return {
        type: SET_WEATHER_HISTORY_INFO_FAILURE,
        error
    }
}

export const setWeatherDayToDisplay = (index) => {
    return {
        type: SET_WEATHER_DAY_TO_DISPLAY,
        index
    }
}
