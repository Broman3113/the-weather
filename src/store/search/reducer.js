import {SET_SEARCH_INFO_FAILURE, SET_SEARCH_INFO_REQUEST, SET_SEARCH_INFO_SUCCESS} from "./action";

const initialState = {
    searchResults: [],
    isSearchLoading: false,
    searchError: null,
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SEARCH_INFO_REQUEST:
            return {...state, isSearchLoading: true}
        case SET_SEARCH_INFO_SUCCESS:
            return {...state, searchResults: action.searchResults, isSearchLoading: false}
        case SET_SEARCH_INFO_FAILURE:
            return {...state, searchError: action.error, isSearchLoading: false}
        default:
            return state
    }
}
