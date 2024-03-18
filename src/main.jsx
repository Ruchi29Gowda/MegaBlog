import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AddPosts from './pages/AddPosts.jsx'
import AllPosts from './pages/AllPosts.jsx'
import EditPosts from './pages/EditPosts.jsx'
import Home from './pages/Home.jsx'
import Post from './pages/Post.jsx'
import SignupPage from './pages/SignupPage.jsx'
import User from './pages/User.jsx'

import {Protected, Login} from './components/index.js'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/login",
                element: 
                    <Protected authentication={false}>
                        <Login/>
                    </Protected>
            },
            {
                path: "/signup",
                element: 
                    <Protected authentication={false}>
                        <SignupPage/>
                    </Protected>
            },
            {
                path: "/all-posts",
                element: 
                    <Protected authentication>
                        {" "}
                        <AllPosts/>
                    </Protected>
            },
            {
                path: "/add-post",
                element: 
                    <Protected authentication>
                        {" "}
                        <AddPosts/>
                    </Protected>
            },
            {
                path: "/edit-posts/:slug",
                element: 
                    <Protected authentication>
                        {" "}
                        <EditPosts/>
                    </Protected>
            },
            {
                path: "/post/:slug",
                element: 
                    <Post/>
            },
            {
                path: "/Profile",
                element: 
                    <User/>
            }
            

        ]
    }
])


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
)
