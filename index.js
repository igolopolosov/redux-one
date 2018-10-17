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

export const replaceState = createAction(
    '@@REDUX-ONE/REPLACE',
    nextState => nextState
);

export const addDiffState = createAction(
    '@@REDUX-ONE/ADD-DIFF',
    diffState => diffState
);

export function one(state, action) {
    switch (action.type) {
        case replaceState.type:
            return action.payload;
        case addDiffState.type:
            return objectAssignDeep({}, state, action.payload); 
        default:
            return state;
    }
}

export function combineOne(reducer) {
    return (state, ...rest) => {
        const nextState = one(state, ...rest)
        return state === nextState
            ? reducer(nextState, ...rest)
            : nextState
    }
}
