import React, {useEffect, useState} from "react";
import {TodolistsApi, UpdateTaskModelType} from "./todolists-api";


export default {
    title: 'API',
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        TodolistsApi.getTodolists()
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = 'Eto polnaia xana'
        TodolistsApi.createTodolist(title)
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const RemoveTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '9d23dd1e-3248-4c93-a3e0-1349464d1355'
        TodolistsApi.removeTodolist(todolistId)
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '7c1f9cb4-e7b2-4e8d-b2f8-c5eeaf0184fb'
        const title = 'Obnovil eche'
        TodolistsApi.updateTodolist(todolistId, title)
            .then((res) => {

                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoID = '7c1f9cb4-e7b2-4e8d-b2f8-c5eeaf0184fb'
        TodolistsApi.getTasks(todoID)
            .then((res) => {

                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoID = '7c1f9cb4-e7b2-4e8d-b2f8-c5eeaf0184fb'
        const titleTask = 'eto new taska'
        TodolistsApi.createTask(todoID, titleTask)
            .then((res) => {

                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const RemoveTask = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todoID = '7c1f9cb4-e7b2-4e8d-b2f8-c5eeaf0184fb'
        const taskID = '3f1c6586-5cbd-42c5-a4ed-49f014e10eb8'
        TodolistsApi.removeTask(todoID, taskID)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const model: UpdateTaskModelType = {
        title: 'da-da obnova',
        deadline: null,
        description: 'opisanie',
        priority: 1,
        startDate: null,
        status: 2
    }
    useEffect(() => {
        const todoID = '7c1f9cb4-e7b2-4e8d-b2f8-c5eeaf0184fb'
        const taskID = '0f89722b-5556-4fea-ab5b-f16b31f6c1de'
        TodolistsApi.updateTask(todoID, taskID, model)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

