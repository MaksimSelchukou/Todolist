import {v1} from "uuid";
import {
    changeTodoFilterAC,
    changeTodoTitleAC,
    removeTodoAC,
    setTodolistsAC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";


export let todolistId1 = v1();
export let todolistId2 = v1();
let startState: Array<TodolistDomainType>;

beforeEach(() => {
        startState = [
            {id: todolistId1, title: "What to learn", addedDate: '', order: 1, filter: "all",entityStatus:'idle'},
            {id: todolistId2, title: "What to buy", addedDate: '', order: 1, filter: "all",entityStatus:'idle'}
        ]
    }
)


test('correct todolist should be remove', () => {

    const endState = todolistsReducer(startState, removeTodoAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('title should be changed in correct todolist', () => {
    const newTitle = 'I am new Title'
    const endState = todolistsReducer(startState, changeTodoTitleAC(todolistId1, newTitle))

    expect(endState[0].id).toBe(todolistId1)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[1].title).toBe('What to buy')
    expect(endState.length).toBe(2)
})

test('todolists should be filtered in dependencies to clicked button "all","active","completed"', () => {
    const valueFilter = 'active'

    const endState = todolistsReducer(startState, changeTodoFilterAC(todolistId2, valueFilter))

    expect(endState[1].filter).toBe(valueFilter)
})

test('todolists should be setted', () => {
    const endState = todolistsReducer([], setTodolistsAC(startState))
    expect(endState.length).toBe(2)
})