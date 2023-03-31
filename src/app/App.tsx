import React, {useCallback} from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './App.css';
import {AddItemForm} from "../components/addItemForm/AddItemForm";
import {addTodolistTC} from "../features/todoLists/todolists-reducer";

import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import Todolists from '../features/todoLists/Todolists';
import {CustomizedSnackbars} from "../components/errorSnackBar/ErrorSnackBar";


// export function LinearIndeterminate() {
//     return (
//         <Box sx={{width: '100%'}}>
//             <LinearProgress/>
//         </Box>
//     );
// }

function App() {

    const dispatch = useAppDispatch()
    const appStatus = useAppSelector(state => state.app.status)
    const addTodolist = useCallback((titleTodo: string) => {
        dispatch(addTodolistTC(titleTodo))
    }, [dispatch])

    console.log('appStatus',appStatus)
    return (
        <>
            {/*{LinearIndeterminate()}*/}
            {/*{appStatus === 'loading'  && <LinearProgress/>}*/}
            {appStatus === 'loading'  && <LinearProgress/>}
            <CustomizedSnackbars/>
            <div className="App">

                <AddItemForm addItem={addTodolist}/>
                <Todolists/>
            </div>
        </>
    );
}

export default App;
