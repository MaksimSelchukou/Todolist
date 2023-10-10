import {TasksStateType, TaskType, TodolistsApi, UpdateTaskModelType} from "../../api/todolists-api";


import {Dispatch} from "redux";
import {RootState} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {addTodoAC, removeTodoAC, setTodolistsAC} from "./todolists-reducer";

// reducers
export const tasksReducer = (state: TasksStateType = {}, action: any): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            debugger
            return {...state, [action.todoID]: action.tasks}
        }
        case setTodolistsAC.type: {
            debugger
            const stateCopy = {...state}
            action.payload.todolists.forEach((tl:any) => {
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
        case "UPDATE-TASK":
            return {
                ...state, [action.todoID]: state[action.todoID]
                    .map(task => task.id === action.taskID ? {...task, ...action.model} : task)
            }

        case removeTodoAC.type: {
            const stateCopy = {...state}
            delete stateCopy[action.payload.todoID]
            return {...stateCopy}
        }
        case addTodoAC.type: {
            return {...state, [action.payload.todolist.id]: []}
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
export const fetchTasksTC = (todoID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    TodolistsApi.getTasks(todoID)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todoID))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}
export const removeTaskTC = (todoID: string, taskID: string) => (dispatch: Dispatch<any>) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    TodolistsApi.removeTask(todoID, taskID)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todoID, taskID))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
}
export const addTaskTC = (title: string, todoID: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    TodolistsApi.createTask(todoID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC({status: 'succeeded'}))
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
    dispatch(setAppStatusAC({status: 'loading'}))
    TodolistsApi.updateTask(todolistId, taskID, modelAPITask)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskID, model))
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

export type TasksReducersActionsType =
    | AddTaskType
    | RemoveTaskType
    | ChangeTitleTaskType
    | ChangeStatusTaskType
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

