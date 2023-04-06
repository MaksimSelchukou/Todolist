import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    debugger
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some Error occurred'))
    }
    debugger
    dispatch(setAppStatusAC("failed"))
}

export const handleServerNetworkError = (err: AxiosError, dispatch: Dispatch) => {
    debugger
    dispatch(setAppErrorAC(err.message ? err.message : 'Some error occurred'))
    dispatch(setAppStatusAC("failed"))
}