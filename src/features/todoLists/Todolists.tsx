import React, {useCallback, useEffect} from 'react';
import {Todolist} from './todolist/Todolist';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {addTodolistTC, changeTodolistTitleTC, fetchTodolistsTC, removeTodolistTC} from "./todolists-reducer";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {Navigate} from "react-router-dom";

export const Todolists = () => {

    const todolists = useAppSelector(state => state.todolists)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const addTodolist = useCallback((titleTodo: string) => {
        dispatch(addTodolistTC(titleTodo))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])

    const changeTitleTodo = useCallback((todoID: string, title: string) => {
        dispatch(changeTodolistTitleTC(todoID, title))
    }, [dispatch])

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    debugger
    return (
        <>
            <AddItemForm addItem={addTodolist}/>
            {todolists.map(tl => {
                return (
                    <Todolist
                        todolist={tl}
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTitleTodo={changeTitleTodo}
                    />
                );
            })}
        </>
    )


};

export default Todolists;


// {
//     todolists.map(tl => {
//         return <todolist
//             key={tl.id}
//             id={tl.id}
//             title={tl.title}
//             filter={tl.filter}
//             removeTodolist={removeTodolist}
//             changeTitleTodo={changeTitleTodo}
//         />
//     })
// }