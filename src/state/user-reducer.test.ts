import {userReducer} from "./user-reducer";


test('user reducer should increment only age', () => {
    const startSate = {age: 20, childrenCount: 3, name: 'Maksim'}
    const action = {type: 'INCREMENT-AGE'}
    const endState = userReducer(startSate, action)

    expect(endState.age).toBe(21)
    expect(endState.name).toBe('Maksim')
})

test('user reducer should increment only children count', () => {
    const startSate = {age: 20, childrenCount: 3, name: 'Maksim'}
    const action = {type: 'INCREMENT-CHILDREN-COUNT'}
    const endState = userReducer(startSate, action)

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(4)
})