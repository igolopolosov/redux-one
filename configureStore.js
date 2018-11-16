import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { logger, getOne } from './'

const [reducer, replace, amend] = getOne({})
export const replaceState = replace
export const amendState = amend

export const store = createStore(
    reducer,
    applyMiddleware(thunk, logger)
)
