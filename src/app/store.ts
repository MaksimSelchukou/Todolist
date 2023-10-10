import {combineReducers} from 'redux'
import {tasksReducer, TasksReducersActionsType} from "../features/todoLists/tasks-reducer";
import {todolistsReducer} from "../features/todoLists/todolists-reducer";
import thunk, {ThunkDispatch} from 'redux-thunk';
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})



export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})





export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>


type AppActionsType = TasksReducersActionsType

// export type AppThunk<ReturnType = void> = ThunkDispatch<any, any, any>



