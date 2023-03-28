import {TodolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type AddTodoType = ReturnType<typeof addTodoAC>
export type RemoveTodoType = ReturnType<typeof removeTodoAC>
type ChangeTodoTitleType = ReturnType<typeof changeTodoTitleAC>
export type ChangeTodoFilterType = ReturnType<typeof changeTodoFilterAC>
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>


type TodolistsStateType = Array<TodolistDomainType>;

export type ActionTodolistType =
    AddTodoType
    | RemoveTodoType
    | ChangeTodoTitleType
    | ChangeTodoFilterType
    | SetTodolistsType;


export const todolistsReducer = (state: TodolistsStateType = [], action: ActionTodolistType): TodolistsStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.todolists.map((todo) => {
                return {...state, ...todo, filter: 'all'}
            })
        }
        case  'ADD-TODOLIST': {
            // const newTodo: TodolistDomainType = {
            //     title: action.title,
            //     addedDate: '',
            //     order: 1,
            //     id: action.todoID,
            //     filter: 'all'
            // }
            const newTodo: TodolistDomainType = {
                ...action.todolist,
                filter: "all"
            }
            return [newTodo, ...state]
        }
        case "REMOVE-TODOLIST": {
            return state.filter(todo => todo.id !== action.todoID)
        }
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


//export const addTodoAC = (title: string) => ({type: 'ADD-TODOLIST', title: title, todoID: v1()} as const)
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

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    TodolistsApi.getTodolists()
        .then(res => dispatch(setTodolistsAC(res.data)))
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