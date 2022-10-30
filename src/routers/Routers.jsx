import React from 'react'
import { useRoutes } from 'react-router-dom'
import MainLayout from '../components/MainLayout/MainLayout'
import AuthLayout from '../components/AuthLayout/AuthLayout';
import AdminLayout from  '../components/AdminLayout/AdminLayout';
const Routers = () => {
    const routing = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {

                }

            ]
        },
        {
            path:'/',
            element:<AuthLayout />,
            children:[
                {

                }
            ]

        },
        {
            path:'/',
            element:<AdminLayout />,
            children:[
                {
                    
                }
            ]
        }
    ])
    return routing
}

export default Routers