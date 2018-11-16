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

store.dispatch(initStore())

store.dispatch(fetchData('abc.com'))

function fetchData (url) {
    return (dispatch, getState) => {
        const state = getState()

        const urlToCall = url + '_' + state.version

        setTimeout(() => {
            console.log(urlToCall)
            const data = {
                code: 1,
                size: "123",
                urlToCall
            }
                    
            dispatch(amendState({
                ...state,
                data
            }))
        }, 300)
    }
}

function initStore () {
    return replaceState({
        version: '1.1.1'
    })
}
