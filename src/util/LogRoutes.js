import React,{useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import {AuthContext} from '../context/Adminauth';


function LogRoutes(){
    const {admin} = useContext(AuthContext);
    return !admin ?  <Outlet /> : <Navigate to="/" />    
}

export default LogRoutes;