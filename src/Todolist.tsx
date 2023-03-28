import React, {useCallback, useEffect} from 'react';

import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {useSelector} from "react-redux";
import {addTaskTC, fetchTasksTC, removeTaskTC, updateTaskTC} from "./state/tasks-reducer";
import {RootReducerType} from "./store/store";
import {changeTodoFilterAC, FilterValuesType} from "./state/todolists-reducer";
import {Task} from "./components/Task";
import {TaskStatuses, TaskType} from "./api/todolists-api";
import {useAppDispatch} from "./hooks/hooks";


type PropsType = {
    id: string
    title: string
    removeTodolist: (id: string) => void
    filter: FilterValuesType
    changeTitleTodo: (todoID: string, title: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log('Todolist is called')

    const dispatch = useAppDispatch()
    const tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[props.id])

    // function removeTask(id: string, todolistId: string) {
    //     const action = removeTaskAC(todolistId, id)
    //     dispatch(action)
    // }
    function removeTask(id: string, todolistId: string) {
        // const action = removeTaskAC(todolistId, id)
        dispatch(removeTaskTC(todolistId, id))
    }

    const addTask = (title: string) => {
        // const action = addTaskAC(props.id, title)
        // dispatch(action)
        // const action = addTaskAC(props.id, title)
        dispatch(addTaskTC(title, props.id))
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        // const action = changeStatusTaskAC(todolistId, id, status)
        const action = updateTaskTC(id, {status}, todolistId)
        dispatch(action)
    }

    const changeTitleTask = useCallback((todoID: string, taskID: string, title: string) => {
        // const action = changeTitleTaskAC(todoID, taskID, title)
        // dispatch(action)
        dispatch(updateTaskTC(taskID, {title}, todoID))
    }, [dispatch])

    // const changeTitleTask = (todoID: string, taskID: string, title: string) => {
    //     const action = changeTitleTaskAC(todoID, taskID, title)
    //     dispatch(action)
    // }

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const action = changeTodoFilterAC(todolistId, value)
        dispatch(action)
    }, [])

    const addItemHandler = useCallback((title: string) => addTask(title), [])

    const removeTodolist = () => props.removeTodolist(props.id)

    // const onAllClickHandler = () => changeFilter("all", props.id);
    // const onActiveClickHandler = () => changeFilter("active", props.id);
    // const onCompletedClickHandler = () => changeFilter("completed", props.id);


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
            <button onClick={removeTodolist}>x</button>
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



