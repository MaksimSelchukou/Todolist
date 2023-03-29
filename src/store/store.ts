import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer, TasksReducerActionsType} from "../state/tasks-reducer";
import {ActionTodolistType, todolistsReducer} from "../state/todolists-reducer";
import thunk, {ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk))
type AppActionsType = TasksReducerActionsType | ActionTodolistType
export type RootReducerType = ReturnType<typeof rootReducer>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>

// export type AppThunk<ReturnType = void> = ThunkDispatch<any, any, any>

// @ts-ignore
window.store = store

