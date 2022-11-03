import React from 'react'
import { NavLink } from 'react-router-dom'
import './errorPage.scss'
const ErrorPage = () => {
    return (
        <div className='error'>
            <div className='err-bg'>
                <div className='err'>
                    <h1 className='text-orange-500  text-[100px] font-semibold text-center'>404</h1>
                    <p className='text-white text-[40px] text-center'>Page not found</p>
                    <p className='pt-[20px] text-white text-center'>Trở về <NavLink className='text-orange-500 font-bold hover:text-orange-700' to='/'>TRANG CHỦ</NavLink></p>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage