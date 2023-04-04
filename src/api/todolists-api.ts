import axios from "axios"


export const settings = {
    withCredentials: true
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type ResponseType<D = {}> = {
    data: D
    fieldsErrors: []
    messages: Array<string>
    resultCode: number
}


type ResponseTaskType<I = []> = {
    items: I
    totalCount: number
    error: string
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
});

export type UpdateTaskModelType = {
    title: string
    description: string | null
    status: number
    priority: number
    startDate: string | null
    deadline: string | null
}


export const TodolistsApi = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists/')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists/', {title: title})
    },
    removeTodolist(id: string) {
        return instance.delete<ResponseType>(`/todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`/todo-lists/${id}`, {title: title})
    },
    getTasks(todolistID: string) {
        return instance.get <ResponseTaskType<Array<TaskType>>>(`/todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID: string, titleTask: string) {
        return instance.post<ResponseType<{item :TaskType}>>(`/todo-lists/${todolistID}/tasks`, {title: titleTask}, settings)
    },
    removeTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
    },
    updateTask(todolistID: string, taskID: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType>(`/todo-lists/${todolistID}/tasks/${taskID}`, {...model})
    }
}