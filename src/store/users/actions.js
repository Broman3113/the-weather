export const ADD_USER_ACTION = "ADD_USER_ACTION";
export const SET_USERS_ACTION = "SET_USERS_ACTION";

export const addUserAction = (user) => {
    return {
        type: ADD_USER_ACTION,
        user
    }
}
export const setUsersAction = (users) => {
    return {
        type: SET_USERS_ACTION,
        users
    }
}

