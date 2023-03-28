import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import {addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, removeTodolistTC} from "./state/todolists-reducer";
import {TaskType} from "./api/todolists-api";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";


// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    console.log('App is called')

    const dispatch = useAppDispatch()
    const todolists = useAppSelector(state => state.todolists)
    console.log(todolists)

    useEffect(() => {

        dispatch(fetchTodolistsTC())
    }, [])

    const addTodolist = useCallback((titleTodo: string) => {
        // const action = addTodoAC(titleTodo)
        dispatch(addTodolistTC(titleTodo))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        // const action = removeTodoAC(id)
        // dispatch(action)
        dispatch(removeTodolistTC(id))
    }, [dispatch])

    const changeTitleTodo = useCallback((todoID: string, title: string) => {
      //  dispatch(changeTodoTitleAC(todoID, title))
        dispatch(changeTodolistTitleTC(todoID, title))
    }, [dispatch])

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTitleTodo={changeTitleTodo}
                    />
                })
            }

        </div>
    );
}

export default App;
