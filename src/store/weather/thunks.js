import {
    setWeatherHistoryInfoFailure,
    setWeatherHistoryInfoRequest, setWeatherHistoryInfoSuccess,
    setWeatherInfoFailure,
    setWeatherInfoRequest,
    setWeatherInfoSuccess
} from "./actions";
import {setLocation} from "../profile/actions";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6f7ecd976fmsh1d8983d2092cce8p1b253cjsn646b033e4233',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

export const fetchWeather = (city = "London") => {
    return async dispatch => {
        dispatch(setLocation(city));
        dispatch(setWeatherInfoRequest());
        fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error with status code " + response.status);
            })
            .then(response => dispatch(setWeatherInfoSuccess(response)))
            .catch(err => dispatch(setWeatherInfoFailure(err)));
    }
}

export const fetchWeatherHistory = (city, date) => {
    return async dispatch => {
        dispatch(setWeatherHistoryInfoRequest());
        fetch(`https://weatherapi-com.p.rapidapi.com/history.json?q=${city}&dt=${date}&lang=en`, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error with status code " + response.status);
            })
            .then(response => dispatch(setWeatherHistoryInfoSuccess(response)))
            .catch(err => dispatch(setWeatherHistoryInfoFailure(err)));
    }
}

