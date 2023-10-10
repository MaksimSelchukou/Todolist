import {TodolistsApi, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const slice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistsStateType,
    reducers: {
        setTodolistsAC: (state, action: PayloadAction<{ todolists: Array<TodolistType> }>) => {
            return action.payload.todolists.map(todo => ({...state, ...todo, filter: 'all', entityStatus: 'idle'}))
        },
        addTodoAC: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
            // return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]

            state.push({...action.payload.todolist, filter: "all", entityStatus: 'idle'})
        },
        removeTodoAC: (state, action: PayloadAction<{ todoID: string }>) => {

            const index = state.findIndex(todo => todo.id === action.payload.todoID)
            if (index !== -1) state.splice(index, 1)
        },
        changeTodoTitleAC: (state, action: PayloadAction<{ todoID: string, title: string }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todoID)
            if (index !== -1) state[index].title = action.payload.title
        },
        changeTodoFilterAC: (state, action: PayloadAction<{ todoID: string, filter: FilterValuesType }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todoID)
            if (index !== -1) state[index].filter = action.payload.filter
        },
        changeTodoEntityStatusAC: (state, action: PayloadAction<{ todoID: string, entityStatus: RequestStatusType }>) => {
            const index = state.findIndex(todo => todo.id === action.payload.todoID)
            if (index !== -1) state[index].entityStatus = action.payload.entityStatus
        },
    }
})

export const {
    setTodolistsAC,
    addTodoAC,
    removeTodoAC,
    changeTodoTitleAC,
    changeTodoFilterAC,
    changeTodoEntityStatusAC
} = slice.actions
export const todolistsReducer = slice.reducer

// export const _todolistsReducer = (state: TodolistsStateType = [], action: TodolistsReducersActionsType): TodolistsStateType => {
//     switch (action.type) {
//         // case 'SET-TODOLISTS':
//         //     debugger
//         //     return action.todolists.map(todo => ({...state, ...todo, filter: 'all', entityStatus: 'idle'}))
//         // case  'ADD-TODOLIST':
//         //     return [{...action.todolist, filter: "all", entityStatus: 'idle'}, ...state]
//         case "REMOVE-TODOLIST":
//             return state.filter(todo => todo.id !== action.todoID)
//         case "CHANGE-TITLE-TODO": {
//             return state.map(todo => todo.id === action.todoID ? {...todo, title: action.title} : todo)
//         }
//         case "CHANGE-ENTITY-STATUS-TODO": {
//             return state.map(todo => todo.id === action.todoID ? {...todo, entityStatus: action.entityStatus} : todo)
//         }
//         case "CHANGE-FILTER-TODO": {
//             return state.map(todo => todo.id === action.todoID ? {...todo, filter: action.filter} : todo)
//         }
//         default : {
//             return state
//         }
//     }
// }

// reducers

// export const addTodoAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist,} as const)
// export const removeTodoAC = (todoID: string) => ({type: 'REMOVE-TODOLIST', todoID} as const)
// export const changeTodoTitleAC = (todoID: string, title: string) => ({
//     type: 'CHANGE-TITLE-TODO',
//     todoID,
//     title
// } as const)
// export const changeTodoFilterAC = (todoID: string, filter: FilterValuesType) => ({
//     type: 'CHANGE-FILTER-TODO',
//     todoID,
//     filter
// } as const)
//
// export const changeTodoEntityStatusAC = (todoID: string, entityStatus: RequestStatusType) => ({
//     type: 'CHANGE-ENTITY-STATUS-TODO',
//     todoID,
//     entityStatus
// } as const)

// export const setTodolistsAC = (todolists: Array<TodolistType>) => ({
//     type: 'SET-TODOLISTS',
//     todolists
// } as const)


// thunks

export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    TodolistsApi.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC({todolists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })

}
export const removeTodolistTC = (todoID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodoEntityStatusAC({todoID: todoID, entityStatus: 'loading'}))
    TodolistsApi.removeTodolist(todoID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoAC({todoID: todoID}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
}
export const addTodolistTC = (titleTodo: string) => (dispatch: Dispatch) => {
    TodolistsApi.createTodolist(titleTodo)
        .then(res => dispatch(addTodoAC({todolist: res.data.data.item})))
}
export const changeTodolistTitleTC = (todoID: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    TodolistsApi.updateTodolist(todoID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoTitleAC({todoID: todoID,title: title}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}


// types

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType
}

// export type AddTodoType = ReturnType<typeof addTodoAC>
// export type RemoveTodoType = ReturnType<typeof removeTodoAC>
// type ChangeTodoTitleType = ReturnType<typeof changeTodoTitleAC>
// export type ChangeTodoFilterType = ReturnType<typeof changeTodoFilterAC>
// export type SetTodolistsType = ReturnType<typeof setTodolistsAC>

type TodolistsStateType = Array<TodolistDomainType>;

// export type TodolistsReducersActionsType =
//     | AddTodoType
//     | RemoveTodoType
//     | ChangeTodoTitleType
//     | ChangeTodoFilterType
//     | SetTodolistsType
//     | ReturnType<typeof changeTodoEntityStatusAC>