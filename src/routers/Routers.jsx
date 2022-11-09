import React from 'react';
import { useRoutes } from 'react-router-dom';
import MainLayout from '../components/MainLayout/MainLayout'
import AuthLayout from '../components/AuthLayout/AuthLayout';
import AdminLayout from '../components/AdminLayout/AdminLayout';
import Login from '../modules/Authentication/pages/Login';
import Register from '../modules/Authentication/pages/Register';
import MovieList from '../modules/Admin/pages/AdminMovie/MovieList';
import AddMovie from '../modules/Admin/pages/AdminMovie/AddMovie';
import EditMovie from '../modules/Admin/pages/AdminMovie/EditMovie';
import AddShowTimes from '../modules/Admin/pages/AdminMovie/AddShowTimes';
import UserList from '../modules/Admin/pages/AdminUser/UserList';
import AddUser from '../modules/Admin/pages/AdminUser/AddUser';
import EditUser from '../modules/Admin/pages/AdminUser/EditUser';
import User from '../modules/User/page/User';
import ErrorPage from '../modules/Error/ErrorPage';
import Home from '../modules/Home/Home';
import Movie from '../modules/Movie/Movie';
import Booking from '../modules/Booking/Booking';
import OutRoute from './OutRouter';


const Routers = () => {
    const routing = useRoutes([
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    index: '/',
                    element:<Home/>
                },
                {
                    path: '/movie/:movieId',
                    element: <Movie/>
                },
                {
                    path: '/ticket/:ticketId',
                    element: <Booking/>
                },
                {
                    path: '/user',
                    element: <User />
                },
                {
                    path:'checkout/:checkoutId',
                    element:<OutRoute/>
                }

            ]
        },
        {
            path: '/',
            element: <AuthLayout />,
            children: [
                {
                    path: "/login",
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                }

            ]

        },
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    path: '/admin/movieList',
                    element: <MovieList />,
                },
                {
                    path: '/admin/addMovie',
                    element: <AddMovie />,
                },
                {
                    path: '/admin/editMovie/:movieId',
                    element: <EditMovie />,
                },
                {
                    path: '/admin/showtimes/:movieId',
                    element: <AddShowTimes />,
                },
                {
                    path: '/admin/userList',
                    element: <UserList />,
                },
                {
                    path: '/admin/addUser',
                    element: <AddUser />,
                },
                {
                    path: '/admin/editUser/:userId',
                    element: <EditUser />,
                }
            ]
        },
        {
            path: '*',
            element: <ErrorPage />
        }
    ])
    return routing
}

export default Routers