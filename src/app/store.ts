import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer, TasksReducersActionsType} from "../features/todoLists/tasks-reducer";
import {TodolistsReducersActionsType, todolistsReducer} from "../features/todoLists/todolists-reducer";
import thunk, {ThunkDispatch} from 'redux-thunk';
import {appReducer, AppReducersActionsType} from "./app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
})


export const store = createStore(rootReducer, applyMiddleware(thunk))
type AppActionsType = TasksReducersActionsType | TodolistsReducersActionsType | AppReducersActionsType
export type RootReducerType = ReturnType<typeof rootReducer>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

// export type AppThunk<ReturnType = void> = ThunkDispatch<any, any, any>

// @ts-ignore
window.store = store

