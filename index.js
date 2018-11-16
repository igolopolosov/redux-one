import objectAssignDeep from 'object-assign-deep'

export const logger = store => next => action => {
    console.log('dispatching', action)
    console.log('previous state', store.getState())
    let result = next(action)
    console.log('next state', store.getState())
    console.log()
    return result
}

function createAction(type, action) {
    const createdAction = (...args) => ({
        type,
        payload: action(...args)
    })

    createdAction.type = type

    return createdAction
}

export function getOne(initState) {
    const id = Math.random();

    const replaceState = createAction(
        '@@REDUX-ONE/REPLACE/' + id,
        nextState => nextState
    );
    
    const amendState = createAction(
        '@@REDUX-ONE/AMEND/' + id,
        diffState => diffState
    );

    const oneReducer = (state = initState, action) => {
        switch (action.type) {
            case replaceState.type:
                return action.payload;
            case amendState.type:
                return typeof action.payload === 'object' && action.payload !== null
                    ? objectAssignDeep({}, state, action.payload)
                    : action.payload; 
            default:
                return state;
        }
    }

    return [oneReducer, replaceState, amendState]
}
