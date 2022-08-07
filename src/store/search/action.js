export const SET_SEARCH_INFO_REQUEST = "SET_SEARCH_INFO_REQUEST";
export const SET_SEARCH_INFO_SUCCESS = "SET_SEARCH_INFO_SUCCESS";
export const SET_SEARCH_INFO_FAILURE = "SET_SEARCH_INFO_FAILURE";

export const setSearchInfoRequest = () => {
    return {
        type: SET_SEARCH_INFO_REQUEST,
    }
}
export const setSearchInfoSuccess = (searchResults) => {
    return {
        type: SET_SEARCH_INFO_SUCCESS,
        searchResults
    }
}
export const setSearchInfoFailure = (error) => {
    return {
        type: SET_SEARCH_INFO_FAILURE,
        error
    }
}
