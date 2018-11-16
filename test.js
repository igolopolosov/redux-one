import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { logger, getOne } from './'

const mainReducer = () => ("main")

const [reducer, replace, amend] = getOne({})
export const replaceState = replace
export const amendState = amend

const store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
)

store.dispatch(replaceState({
    a: {
        b: 2
    }
}))

store.dispatch(amendState({
    a: {
        c: 2
    }
}))

store.dispatch((dispatch, getState) => {
    const state = getState()

    const nextState = {
        ...state,
        g: 1
    }

    dispatch(amendState(nextState))
})
