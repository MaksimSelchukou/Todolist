import React, {useCallback, useEffect} from 'react';
import {Todolist} from './todolist/Todolist';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {changeTodolistTitleTC, fetchTodolistsTC, removeTodolistTC} from "./todolists-reducer";

export const Todolists = () => {

    const todolists = useAppSelector(state => state.todolists)
    const dispatch = useAppDispatch()

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistTC(id))
    }, [dispatch])

    const changeTitleTodo = useCallback((todoID: string, title: string) => {
        dispatch(changeTodolistTitleTC(todoID, title))
    }, [dispatch])

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    return (
        <>
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