import {appReducer, InitialStateType, setAppErrorAC} from "./app-reducer";

test('if an error occurs,then field error to be changed', () => {

    const startState: InitialStateType = {
        status: 'idle',
        error: null
    }

    const endState = appReducer(startState, setAppErrorAC('error'))

    expect(endState.error).toBe('error')
})