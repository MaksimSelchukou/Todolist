import React, {useCallback, useEffect} from 'react';

import {AddItemForm} from "../../../components/addItemForm/AddItemForm";
import {EditableSpan} from "../../../components/editableSpan/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} from "../tasks-reducer";
import {AppRootStateType} from "../../../app/store";
import {changeTodoFilterAC, FilterValuesType, TodolistDomainType} from "../todolists-reducer";

import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {Task} from "./task/Task";


type PropsType = {
    id: string
    title: string
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTitleTodo: (todoID: string, title: string) => void
    todolist: TodolistDomainType
}

export const Todolist = React.memo((props: PropsType) => {
    // console.log('todolist is called')

    const dispatch = useDispatch<any>()
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    // const entityStatus = useAppSelector(state=>state.todolists)

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskTC(todolistId, id))
    }

    const addTask = (title: string) => {
        dispatch(addTaskTC(title, props.id))
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        const action = updateTaskTC(id, {status}, todolistId)
        dispatch(action)
    }

    const changeTitleTask = useCallback((todoID: string, taskID: string, title: string) => {
        dispatch(updateTaskTC(taskID, {title}, todoID))
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodoFilterAC({todoID: todolistId, filter: value})
        dispatch(action)
    }, [dispatch])

    const addItemHandler = useCallback((title: string) => addTask(title), [])

    const removeTodolist = () => props.removeTodolist(props.id)

    const onButtonClickHandler = (value: FilterValuesType) => {
        return () => changeFilter(value, props.id);
    }

    const changeTodoTitleHandler = useCallback((title: string) => {
        props.changeTitleTodo(props.id, title)
    }, [props.id, props.changeTitleTodo])


    let tasksForTodolist = tasks;
    switch (props.filter) {
        case "active": {
            tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.New)
            break
        }
        case "completed": {
            tasksForTodolist = tasksForTodolist.filter((t) => t.status === TaskStatuses.Completed)
        }
    }

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])
    return <div>

        <h3>
            <EditableSpan title={props.title} onChange={changeTodoTitleHandler}/>
            <button disabled={props.todolist.entityStatus === 'loading'} onClick={removeTodolist}>x</button>
        </h3>

        <AddItemForm addItem={addItemHandler}/>
        <ul>
            {
                tasksForTodolist.map(t => <Task
                    key={t.id}
                    task={t}
                    removeTask={removeTask}
                    changeTitleTask={changeTitleTask}
                    todoId={props.id}
                    changeStatus={changeStatus}/>
                )
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onButtonClickHandler('all')}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onButtonClickHandler('active')}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onButtonClickHandler('completed')}>Completed
            </button>
        </div>
    </div>
})



