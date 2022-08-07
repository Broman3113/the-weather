import {setSearchInfoFailure, setSearchInfoRequest, setSearchInfoSuccess} from "./action";

export const fetchSearch = (value) => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6f7ecd976fmsh1d8983d2092cce8p1b253cjsn646b033e4233',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    return async dispatch => {
        dispatch(setSearchInfoRequest());
        fetch(`https://weatherapi-com.p.rapidapi.com/search.json?q=${value}`, options)
            .then(response => response.json())
            .then(response => dispatch(setSearchInfoSuccess(response)))
            .catch(err => dispatch(setSearchInfoFailure(err)));
    }
}
