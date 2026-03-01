import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import AdminSideBar from './AdminSideBar'

export default function AdminLayout() {
    return (
        <>
            <AdminSideBar />
            <div className="right-side">
                <div className="search-profile-nav admin-nav">
                    <div className="search-profile ">
                        <h2 className="admin-h2">Admin Dashboard</h2>
                    </div>
                </div>
                <div className="right-side-container-admin">
                    <Outlet />
                </div>
            </div>

        </>
    )
}
