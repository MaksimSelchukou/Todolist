import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "../components/Task";
import {action} from "@storybook/addon-actions";
import React from "react";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {todolistId1} from "../state/todolists-reducer.test";


export default {
    title: 'Example/Task',
    component: Task
} as ComponentMeta<typeof Task>

const removeTaskCb = action('remove Task ')
const changeTitleTaskCb = action('change Title on')
const changeStatusCb = action('change Status on')


export const TaskExample: ComponentStory<typeof Task> = (props: any) => {
    return <>
        <Task
            task={{
                id: '1', title: 'Task1', status: TaskStatuses.New, description: '',
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            }}
            removeTask={removeTaskCb}
            changeTitleTask={changeTitleTaskCb}
            todoId={'todoId1'}
            changeStatus={changeStatusCb}
        />
        <Task
            task={{
                id: '2', title: 'Task1', description: '',
                status: TaskStatuses.Completed,
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            }}
            removeTask={removeTaskCb}
            changeTitleTask={changeTitleTaskCb}
            todoId={'todoId2'}
            changeStatus={changeStatusCb}
        />
    </>

}

//export const AddItemFormExample: ComponentStory<typeof AddItemForm> = (props: any) => {
//     return <AddItemForm addItem={callback}/>
// }
