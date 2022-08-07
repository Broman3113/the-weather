export const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('next state' + 4, store.getState());
    return result;
}
