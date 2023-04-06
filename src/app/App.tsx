import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './App.css';


import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import Todolists from '../features/todoLists/Todolists';
import {CustomizedSnackbars} from "../components/errorSnackBar/ErrorSnackBar";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {setAppInitializedTC} from "./app-reducer";


// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <Todolists/>,
//     },
//     {
//         path: "/login",
//         element: <Login/>,
//     }
// ]);

function App() {


    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)  //залогинен
    const appStatus = useAppSelector(state => state.app.status)


    useEffect(() => {
        // debugger
        dispatch(setAppInitializedTC())
    }, [])

    if (!isInitialized) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress/>
                <CustomizedSnackbars/>
            </Box>
        )

    }
    debugger
    return (
        <>
            {appStatus === 'loading' && <LinearProgress/>}
            <CustomizedSnackbars/>
            <div className="App">
                {/*<RouterProvider router={router}/>*/}
                {/*<Routes>*/}
                {/*    <Route path={"/"} element={<Todolists/>}/>*/}
                {/*    <Route path={"/login"} element={<Login/>}/>*/}
                {/*</Routes>*/}
                {/*<Login/>*/}
                <Todolists/>
            </div>
        </>
    );
}

export default App;
