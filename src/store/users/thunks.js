import {addUserAction} from "./actions";

export const addUserThunk = (user) => {
    return dispatch => {
        dispatch(addUserAction(user));
        const users = JSON.parse(localStorage.users);
        localStorage.users = JSON.stringify({...users, users: [...users.users, { id: users.nextId, ...user}], nextId: users.nextId + 1});
    }
}
// export const setUsersThunk = (users) => {
//     return dispatch => {
//         dispatch(setUsersAction(users));
//         localStorage.users = JSON.stringify(users);
//     }
// }
