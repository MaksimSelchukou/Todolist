import {addTodolistTC} from "../features/todoLists/todolists-reducer";
import {Dispatch} from "redux";
import {AutarizationApi} from "../api/autarization-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedInAC} from "../features/login/auth-reducer";

export type AppReducersActionsType = SetAppErrorType | SetAppStatusType | SetAppInitializedType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppReducersActionsType): InitialStateType => {

    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status}
        }
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        case "APP/SET-IS-INITIALIZED": {
            return {...state, isInitialized: action.value}
        }
        default:
            return {...state}
    }
}


type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

type SetAppInitializedType = ReturnType<typeof setAppInitializedAC>
debugger
export const setAppInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)


//thunks


export const setAppInitializedTC = () => (dispatch: Dispatch) => {
    debugger
    dispatch(setAppStatusAC("loading"))
    AutarizationApi.authMe()
        .then(res => {
            debugger
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(setAppInitializedAC(true))
        })
        .catch(err => {
            debugger
            handleServerNetworkError(err, dispatch)
            // dispatch(setAppStatusAC("failed"))
            // dispatch(setAppInitializedAC(true))
        })

}