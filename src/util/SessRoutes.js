import React,{useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { AuthContext } from '../context/Adminauth';

function SessRoutes() {
    const {admin} = useContext(AuthContext);
    return !admin ?  <Outlet /> : <Navigate to="/dashboard" />    
}

export default SessRoutes