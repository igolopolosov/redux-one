import { store, replaceState, amendState } from './configureStore'

store.dispatch(initStore())

store.dispatch(fetchData('abc.com'))

function fetchData(url) {
    return (dispatch, getState) => {
        const state = getState()

        fakeFetch(url + '_' + state.version)
            .then((data) => {                    
                dispatch(amendState({
                    ...state,
                    data
                }))
            })
    }
}

function fakeFetch(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                code: 1,
                size: "123",
                url
            })
        }, 500)
    })
}

function initStore () {
    return replaceState({
        version: '1.1.1'
    })
}
