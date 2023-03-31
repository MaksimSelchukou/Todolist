export type AppReducersActionsType = SetAppErrorType | SetAppStatusType

export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: AppStatusType
    error: string | null
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducersActionsType): InitialStateType => {

    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state,status:action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return {...state}
    }
}


type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: AppStatusType) => ({type: 'APP/SET-STATUS', status} as const)