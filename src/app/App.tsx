import React, {useCallback, useEffect} from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import './App.css';


import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {CustomizedSnackbars} from "../components/errorSnackBar/ErrorSnackBar";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {setAppInitializedTC} from "./app-reducer";
import {createBrowserRouter, Navigate, Route, RouterProvider, Routes} from "react-router-dom";
import {Login} from "../features/login/Login";
import Todolists from '../features/todoLists/Todolists';
import {setIsLoggedOutTC} from "../features/login/auth-reducer";


function App() {



    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)  //залогинен
    const appStatus = useAppSelector(state => state.app.status)

    const logOutHandler = useCallback(() => {
        dispatch(setIsLoggedOutTC())
    },[])

    useEffect(() => {
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
    return (
        <>
            {appStatus === 'loading' && <LinearProgress/>}
            <CustomizedSnackbars/>
            <div style={{display: "flex", justifyContent: 'flex-end'}}>
                <button style={{position: "fixed", marginRight: '100px'}} onClick={logOutHandler}>LogOut</button>
            </div>
            <div className="App">

                <Routes>
                    <Route path={"/"} element={<Todolists/>}/>
                    <Route path={"/login"} element={<Login/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;

