import axios from "axios";
import {ResponseType,} from "./todolists-api";
import {ValuesType} from "../features/login/Login";


type AuthData = {
    id: number
}

type authMeResponseType = {
    id: number
    email: string
    login: string
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/auth/',
    withCredentials: true,
});
export const AutarizationApi = {

    authMe() {
        return instance.get<ResponseType<authMeResponseType>>('me')
    },

    isLoggedIn(values: ValuesType) {
        return instance.post<ResponseType<AuthData>>('login', {...values})
    },
    isLoggedOut(){
        return instance.delete<ResponseType>('login')
    }

}