import React,{useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import {AuthContext} from '../context/Adminauth';


function AdminRoutes(){
    const {admin} = useContext(AuthContext);
    return admin.username == "Administrator" ?  <Outlet /> : <Navigate to="/dashboard" />   
}

export default AdminRoutes;