import {TaskType, TodolistsApi, UpdateTaskModelType} from "../api/todolists-api";
import {TasksStateType} from "../App";

import {AddTodoType, ChangeTodoFilterType, RemoveTodoType, SetTodolistsType} from "./todolists-reducer";
import {Dispatch} from "redux";
import {RootState} from "../store/store";

export type TasksReducerType =
    | AddTaskType
    | RemoveTaskType
    | ChangeTitleTaskType
    | ChangeStatusTaskType
    | RemoveTodoType
    | AddTodoType
    | ChangeTodoFilterType
    | SetTodolistsType
    | SetTasksType


type AddTaskType = ReturnType<typeof addTaskAC>
type RemoveTaskType = ReturnType<typeof removeTaskAC>
type ChangeTitleTaskType = ReturnType<typeof changeTitleTaskAC>
type ChangeStatusTaskType = ReturnType<typeof updateTaskAC>
type SetTasksType = ReturnType<typeof setTasksAC>


export const tasksReducer = (state: TasksStateType = {}, action: TasksReducerType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            const stateCopy = {...state}
            action.tasks.forEach(t => {
                stateCopy[t.todoListId] = action.tasks
            })
            return stateCopy
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "ADD-TASK": {
            // const newTask: TaskType = {
            //     title: action.title,
            //     id: v1(),
            //     status: TaskStatuses.New,
            //     description: '',
            //     order: 0,
            //     addedDate: '',
            //     deadline: '',
            //     startDate: '',
            //     priority: TaskPriorities.Low,
            //     todoListId: action.todolistId
            // }
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case "REMOVE-TASK": {
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskID)}
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state,
                [action.todoId]: state[action.todoId].map(task => task.id === action.taskId ? {
                    ...task,
                    title: action.title
                } : task)
            }
        }
        case "UPDATE-TASK": {
            return {
                ...state,
                [action.todoID]: state[action.todoID].map(task => task.id === action.taskID
                    ?
                    {...task, ...action.model}
                    : task)
            }
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

export const setTasksAC = (tasks: Array<TaskType>) => ({type: 'SET-TASKS', tasks} as const)
//export const addTaskAC = (todolistId: string, title: string) => ({type: 'ADD-TASK', todolistId, title} as const)
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


export const fetchTasksTC = (todoID: string) => (dispatch: Dispatch) => {
    TodolistsApi.getTasks(todoID)
        .then(res => dispatch(setTasksAC(res.data.items)))
}

export const removeTaskTC = (todoID: string, taskID: string) => (dispatch: Dispatch) => {
    TodolistsApi.removeTask(todoID, taskID)
        .then(res => dispatch(removeTaskAC(todoID, taskID)))
}

export const addTaskTC = (title: string, todoID: string) => (dispatch: Dispatch) => {
    // const task:TaskType = getState.tasks[todoID]
    TodolistsApi.createTask(todoID, title)
        .then(res => {
            console.log(res.data.data)
            dispatch(addTaskAC(res.data.data.item))
        })
}


export const changeTaskTitleTC = (todoID: string, taskID: string, title: string) => (dispatch: Dispatch, getState: () => RootState) => {
    const state = getState()
    const task = state.tasks[todoID].find(t => t.id === taskID)
    if (!task) {
        console.warn('Task not found in the state')
        return
    }

    const modelTask: UpdateTaskModelType = {
        title: title,
        status: task.status,
        startDate: task.startDate,
        priority: task.priority,
        description: task.description,
        deadline: task.deadline
    }

    TodolistsApi.updateTask(todoID, taskID, modelTask)
        .then(res => dispatch(changeTitleTaskAC(todoID, taskID, title)))
}

// export const changeTaskStatusTC = (taskID: string, status: TaskStatuses, todolistId: string) => (dispatch: Dispatch, getState: () => RootState) => {
//     const state = getState()
//     const task = state.tasks[todolistId].find(t => t.id === taskID)
//     if (!task) {
//         console.warn('Task not found in the state')
//         return;
//     }
//     const modelAPITask: UpdateTaskModelType = {
//         status: status,
//         title: task.title,
//         startDate: task.startDate,
//         priority: task.priority,
//         description: task.description,
//         deadline: task.deadline
//     }
//     TodolistsApi.updateTask(todolistId, taskID, modelAPITask)
//         .then(res => {
//             console.log({...task})
//             dispatch(changeStatusTaskAC(todolistId, taskID, status))
//         })
// }

type ModelDomainType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
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
    TodolistsApi.updateTask(todolistId, taskID, modelAPITask)
        .then(res => {
            console.log({...task})
            dispatch(updateTaskAC(todolistId, taskID, model))
        })
}

