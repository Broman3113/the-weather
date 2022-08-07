import {setSportEventsFailure, setSportEventsRequest, setSportEventsSuccess} from "./actions";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6f7ecd976fmsh1d8983d2092cce8p1b253cjsn646b033e4233',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
};

export const fetchSportEvents = (location) => {
    return async dispatch => {
        dispatch(setSportEventsRequest());
        fetch(`https://weatherapi-com.p.rapidapi.com/sports.json?q=${location}`, options)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Error with status code " + response.status);
            }).then(response => dispatch(setSportEventsSuccess(response)))
            .catch(err => dispatch(setSportEventsFailure(err)));
    }
}
