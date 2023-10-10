import {setAppErrorAC, setAppStatusAC} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AxiosError} from "axios";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {

    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: "failed"}))
}

export const handleServerNetworkError = (err: AxiosError, dispatch: Dispatch) => {
    dispatch(setAppErrorAC(err.message ? {error: err.message} : {error: 'Some error occurred'}))
    dispatch(setAppStatusAC({status: "failed"}))
}