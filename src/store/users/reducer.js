import {ADD_USER_ACTION, SET_USERS_ACTION} from "./actions";

const initialState = {
    users: [
        {
            id: 1,
            email: 'john@smith.com',
            phone: '+1234567',
            name: 'John',
            surname: 'Smith',
            password: '1234567'
        },
    ],
    nextId: 2,
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER_ACTION:
            return {...state, users: [...state.users, { id: state.nextId, ...action.user}], nextId: state.nextId + 1}
        case SET_USERS_ACTION:
            return action.users;
        default:
            return state
    }
}
