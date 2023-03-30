import {TasksStateType} from "../../app/App";
import {todolistId1, todolistId2} from "./todolists-reducer.test";
import {updateTaskAC, changeTitleTaskAC, removeTaskAC, tasksReducer, addTaskAC} from "./tasks-reducer";
import {addTodoAC, removeTodoAC} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {v1} from "uuid";


let startState: TasksStateType

beforeEach(() => {
    startState = {
        [todolistId1]: [
            {
                id: '1', title: "HTML&CSS",
                status: TaskStatuses.New,
                description: '',
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            },
            {
                id: '2', title: "JS", status: TaskStatuses.New,
                description: '',
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId1
            }
        ],
        [todolistId2]: [
            {
                id: '3', title: "Milk", status: TaskStatuses.Completed,
                description: '',
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId2
            },
            {
                id: '4', title: "React Book", status: TaskStatuses.Completed,
                description: '',
                order: 0,
                addedDate: '',
                deadline: '',
                startDate: '',
                priority: TaskPriorities.Low,
                todoListId: todolistId2
            }
        ]
    }
})

test('correct task should be added in correct todolist', () => {
    const newTask = {
        id: '1', title: 'NewTaskkk',
        status: TaskStatuses.New,
        description: '',
        order: 0,
        addedDate: '',
        deadline: '',
        startDate: '',
        priority: TaskPriorities.Low,
        todoListId: todolistId1
    }
    const endState = tasksReducer(startState, addTaskAC(newTask))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId1][0].title).toBe('NewTaskkk')
    expect(endState[todolistId1][0].id).toBeDefined()
    expect(endState[todolistId2].length).toBe(2)
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, removeTaskAC(todolistId2, '4'))
    expect(endState[todolistId2].length).toBe(1)
    expect(endState[todolistId2][0].id).toBe('3')
    // expect(endState[todolistId2][1].id).toBeUndefined()
    expect(endState[todolistId1].length).toBe(2)
})

test('title selected task should be changed', () => {
    const endState = tasksReducer(startState, updateTaskAC(todolistId2, '4', {title: 'Izmenil'}))
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1][0].title).toBe("HTML&CSS")
    expect(endState[todolistId2][1].title).toBe('Izmenil')
    // expect(endState[todolistId2][1].id).toBeUndefined()
    expect(endState[todolistId1].length).toBe(2)
})

test('status selected task should be changed', () => {
    const endState = tasksReducer(startState, updateTaskAC(todolistId2, '3', {status: TaskStatuses.Completed}))
    expect(endState[todolistId2].length).toBe(2)
    expect(endState[todolistId1][0].title).toBe("HTML&CSS")
    expect(endState[todolistId2][0].status).toBe(TaskStatuses.Completed)
    expect(endState[todolistId2][1].title).toBe("React Book")


})

test('after add todolist should be added empty array tasks', () => {
    const endState = tasksReducer(startState, addTodoAC({id: v1(), title: 'NewTitleTodo', addedDate: '', order: 0}))

    const keys = Object.keys(endState)
    const key = keys.find(key => key !== todolistId2 && key !== todolistId1)
    if (!key) {
        throw new Error('уппс ключ не нашелся')
    }
    expect(keys.length).toBe(3)
    expect(endState[key]).toBeDefined()
})

test('property todolistId should be remove after remove todolist', () => {
    const endState = tasksReducer(startState, removeTodoAC(todolistId1))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todolistId1]).toBeUndefined()

})