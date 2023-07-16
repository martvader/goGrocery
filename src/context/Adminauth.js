import React,{useReducer,createContext} from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
    admin: null, 
}

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

    if(decodedToken.exp * 5000 < Date.now()){
        localStorage.removeItem('jwtToken')
    }else{
        initialState.admin = decodedToken;
    }
}

const AuthContext = createContext({
    admin: null,
    login:(adminData) => {},
    logout: () => {} 
})

function authReducer(state,action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                admin:action.payload 
            }
        case 'LOGOUT':
            return{
                ...state,
                admin:null 
            }
        default:
            return state;
    }   

}

function AdminAuth(props){
    const [state, dispatch] = useReducer(authReducer, initialState);
    function login(adminData){
        localStorage.setItem('jwtToken', adminData.token)
        dispatch({
            type:'LOGIN',
            payload: adminData
        })
    }
    function logout(){
        localStorage.removeItem('jwtToken')
        dispatch({
            type:'LOGOUT'
        })
    }
    return (
        <AuthContext.Provider
            value={{admin: state.admin, login,logout}}
            {...props}
        />
    )
}

export {AuthContext, AdminAuth}