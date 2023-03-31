import {TodolistsApi, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppStatusType, setAppStatusAC} from "../../app/app-reducer";


export const todolistsReducer = (state: TodolistsStateType = [], action: TodolistsReducersActionsType): TodolistsStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            return action.todolists.map(todo => ({...state, ...todo, filter: 'all', entityStatus: 'idle'}))
        case  'ADD-TODOLIST':
            return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]
        case "REMOVE-TODOLIST":
            return state.filter(todo => todo.id !== action.todoID)
        case "CHANGE-TITLE-TODO": {
            return state.map(todo => todo.id === action.todoID ? {...todo, title: action.title} : todo)
        }
        case "CHANGE-FILTER-TODO": {
            return state.map(todo => todo.id === action.todoID ? {...todo, filter: action.filter} : todo)
        }
        default : {
            return state
        }
    }
}

// reducers

export const addTodoAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',

    todolist,
} as const)
export const removeTodoAC = (todoID: string) => ({type: 'REMOVE-TODOLIST', todoID} as const)
export const changeTodoTitleAC = (todoID: string, title: string) => ({
    type: 'CHANGE-TITLE-TODO',
    todoID,
    title
} as const)
export const changeTodoFilterAC = (todoID: string, filter: FilterValuesType) => ({
    type: 'CHANGE-FILTER-TODO',
    todoID,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({
    type: 'SET-TODOLISTS',
    todolists
} as const)

// thunks

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    TodolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })

}
export const removeTodolistTC = (todoID: string) => (dispatch: Dispatch) => {
    TodolistsApi.removeTodolist(todoID)
        .then(res => dispatch(removeTodoAC(todoID)))
}
export const addTodolistTC = (titleTodo: string) => (dispatch: Dispatch) => {
    TodolistsApi.createTodolist(titleTodo)
        .then(res => dispatch(addTodoAC(res.data.data.item)))
}
export const changeTodolistTitleTC = (todoID: string, title: string) => (dispatch: Dispatch) => {
    TodolistsApi.updateTodolist(todoID, title)
        .then(res => dispatch(changeTodoTitleAC(todoID, title)))
}


// types

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: AppStatusType
}

export type AddTodoType = ReturnType<typeof addTodoAC>
export type RemoveTodoType = ReturnType<typeof removeTodoAC>
type ChangeTodoTitleType = ReturnType<typeof changeTodoTitleAC>
export type ChangeTodoFilterType = ReturnType<typeof changeTodoFilterAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>

type TodolistsStateType = Array<TodolistDomainType>;

export type TodolistsReducersActionsType =
    | AddTodoType
    | RemoveTodoType
    | ChangeTodoTitleType
    | ChangeTodoFilterType
    | SetTodolistsType;