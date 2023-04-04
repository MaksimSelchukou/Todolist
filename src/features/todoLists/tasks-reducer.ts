import {TasksStateType, TaskType, TodolistsApi, UpdateTaskModelType} from "../../api/todolists-api";


import {AddTodoType, ChangeTodoFilterType, RemoveTodoType, SetTodolistsType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {RootState} from "../../app/store";
import {AppReducersActionsType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

// reducers
export const tasksReducer = (state: TasksStateType = {}, action: TasksReducersActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            return {...state, [action.todoID]: action.tasks}
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskID)}
        }
        // case "CHANGE-TITLE-TASK": {
        //     return {
        //         ...state,
        //         [action.todoId]: state[action.todoId].map(task => task.id === action.taskId ? {
        //             ...task,
        //             title: action.title
        //         } : task)
        //     }
        // }
        case "UPDATE-TASK":
            return {
                ...state, [action.todoID]: state[action.todoID]
                    .map(task => task.id === action.taskID ? {...task, ...action.model} : task)
            }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete stateCopy[action.todoID]
            return {...stateCopy}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolist.id]: []}
        }
        default: {
            return state
        }
    }
}
export const setTasksAC = (tasks: Array<TaskType>, todoID: string) => ({type: 'SET-TASKS', tasks, todoID} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const removeTaskAC = (todolistId: string, taskID: string) => ({type: 'REMOVE-TASK', todolistId, taskID} as const)
export const changeTitleTaskAC = (todoId: string, taskId: string, title: string) => ({
    type: 'CHANGE-TITLE-TASK',
    todoId,
    taskId,
    title
} as const)
export const updateTaskAC = (todoID: string, taskID: string, model: ModelDomainType) => ({
    type: 'UPDATE-TASK',
    todoID,
    taskID,
    model
} as const)

// thunks
export const fetchTasksTC = (todoID: string) => (dispatch: Dispatch<TasksReducersActionsType | AppReducersActionsType>) => {
    dispatch(setAppStatusAC("loading"))
    TodolistsApi.getTasks(todoID)
        .then(res => {
            debugger
            dispatch(setTasksAC(res.data.items, todoID))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const removeTaskTC = (todoID: string, taskID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    TodolistsApi.removeTask(todoID, taskID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todoID, taskID))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
}
export const addTaskTC = (title: string, todoID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"))
    TodolistsApi.createTask(todoID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const updateTaskTC = (taskID: string, model: ModelDomainType, todolistId: string) => (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState()
    const task = state.tasks[todolistId].find(t => t.id === taskID)
    if (!task) {
        console.warn('Task not found in the state')
        return;
    }
    const modelAPITask: UpdateTaskModelType = {
        status: task.status,
        title: task.title,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline,
        ...model
    }
    dispatch(setAppStatusAC("loading"))
    TodolistsApi.updateTask(todolistId, taskID, modelAPITask)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskID, model))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((err) => {
            handleServerNetworkError(err, dispatch)
        })
}

// types

export type TasksReducersActionsType =
    | AddTaskType
    | RemoveTaskType
    | ChangeTitleTaskType
    | ChangeStatusTaskType
    | RemoveTodoType
    | AddTodoType
    | ChangeTodoFilterType
    | SetTodolistsType
    | SetTasksType

type ModelDomainType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}


type AddTaskType = ReturnType<typeof addTaskAC>
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type ChangeTitleTaskType = ReturnType<typeof changeTitleTaskAC>
type ChangeStatusTaskType = ReturnType<typeof updateTaskAC>
type SetTasksType = ReturnType<typeof setTasksAC>

