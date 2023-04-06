import {Dispatch} from "redux";
import {AutarizationApi} from "../../api/autarization-api";
import {ValuesType} from "./Login";
import {setAppInitializedAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


export type AuthReducerActionType = isLoggedInType | isLoggedOutType
export type InitialStateType = {
    isLoggedIn: boolean
}

const initialState = {
    isLoggedIn: false
}


export const authReducer = (state: InitialStateType = initialState, action: AuthReducerActionType) => {
    switch (action.type) {
        case 'APP/IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.value}
        }
        case "APP/IS-LOGGED-OUT": {
            return {...state, isLoggedIn: action.value}
        }
        default:
            return state
    }
}

type isLoggedInType = ReturnType<typeof setIsLoggedInAC>

export const setIsLoggedInAC = (value: boolean) => ({type: 'APP/IS-LOGGED-IN', value: value} as const)

type isLoggedOutType = ReturnType<typeof setIsLoggedOutAC>

export const setIsLoggedOutAC = (value: boolean) => ({type: 'APP/IS-LOGGED-OUT', value} as const)

export const setIsLoggedInTC = (values: ValuesType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    AutarizationApi.isLoggedIn(values)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)

        })
}

export const setIsLoggedOutTC = () => (dispatch: Dispatch) => {
    debugger
    dispatch(setAppStatusAC('loading'))
    AutarizationApi.isLoggedOut()
        .then(res => {
            if (res.data.resultCode === 0) {
               dispatch( setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)

        })
}