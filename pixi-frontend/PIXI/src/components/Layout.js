import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import SideBar from './SideBar'
import SearchNav from './SearchNav'
import Cart from './Cart'

export default function Layout() {
    return (
        <> <Cart/>
            <SideBar />
            <div className="right-side">
                <SearchNav/>
               
                <Outlet />
                </div>
            <Footer />
        </>
    )
}
