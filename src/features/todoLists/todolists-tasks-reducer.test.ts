
import {addTodoAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {v1} from "uuid";
import { TasksStateType } from "../../api/todolists-api";


test('generate todoID should be the same in array todolists and object tasks', () => {
    const startStateTasks: TasksStateType = {}
    const startStateTodolists: Array<TodolistDomainType> = []

    const action = addTodoAC({id: v1(), title: 'NewTitleTodo', addedDate: '', order: 0})

    const endStateTasks = tasksReducer(startStateTasks, action)
    const endStateTodolists = todolistsReducer(startStateTodolists, action)

    const keys = Object.keys(endStateTasks)
    const keyTa = keys[0]
    const keyTo = endStateTodolists[0].id

    expect(keyTa).toBe(action.todolist.id)
    expect(keyTo).toBe(action.todolist.id)

})