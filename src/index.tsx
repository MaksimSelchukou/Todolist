import React from 'react';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from './app/store';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {Login} from "./features/login/Login";
import Todolists from "./features/todoLists/Todolists";

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container);

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App/>,
//     },
//     {
//         path: "/login",
//         element: <Login/>,
//     }
// ]);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        // loader: rootLoader,
        children: [
            {
                path: "/todolists",
                element: <Todolists/>,
                // loader: teamLoader,
            },
            {
                path: "/login",
                element: <Login />,
                // loader: teamLoader,
            },
        ],
    },
]);

root.render(
    <Provider store={store}>
        <RouterProvider router={router}/>
        {/*<App/>*/}
    </Provider>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

