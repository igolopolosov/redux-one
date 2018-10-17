import { createStore, applyMiddleware } from 'redux'
import { logger, combineOne, replaceState, addDiffState } from './'

const mainReducer = () => ({
    a: {
        b: {
            c: 1
        }
    }
})

const store = createStore(
    combineOne(mainReducer),
    applyMiddleware(logger)
)

store.dispatch(addDiffState({
    a: {
        b: {
            d: 2
        }
    }
}))

store.dispatch(addDiffState({
    a: {
        e: 3
    }
}))

store.dispatch(replaceState(1))
