import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./editableSpan/EditableSpan";

import {TaskStatuses, TaskType} from "../api/todolists-api";

type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string, todoID: string) => void
    changeTitleTask: (todoID: string, taskID: string, title: string) => void
    todoId: string
    changeStatus: (id: string, status: TaskStatuses, todolistId: string) => void

}
export const Task = React.memo((props: TaskPropsType) => {


    const changeTitleTaskHandler = useCallback((title: string) => {
        props.changeTitleTask(props.todoId, props.task.id, title)
    }, [])
    const onClickHandler = () => props.removeTask(props.task.id, props.todoId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        // let newIsDoneValue = e.currentTarget.checked;
        let newIsDoneValue = e.currentTarget.checked;
        props.changeStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoId);
    }
    console.log(props.task.status)
    console.log(props.task.status === TaskStatuses.Completed)
    return (
        <li key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
            <input type="checkbox" onChange={onChangeHandler} checked={props.task.status === TaskStatuses.Completed}/>
            {/*<span>{t.title}</span>*/}
            <EditableSpan title={props.task.title}
                          onChange={changeTitleTaskHandler}
            />
            <button onClick={onClickHandler}>x</button>
        </li>
    )

})