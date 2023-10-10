import {appReducer, InitialStateType, setAppErrorAC} from "./app-reducer";

test('if an error occurs,then field error to be changed', () => {

    const startState: InitialStateType = {
        status: 'idle',
        error: null,
        isInitialized:false
    }

    const endState = appReducer(startState, setAppErrorAC({error: 'error'}))

    expect(endState.error).toBe('error')
})