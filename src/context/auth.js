import React,{useReducer,createContext} from 'react';
import jwtDecode from 'jwt-decode';


const initialState = { 
    user: null
}

if(localStorage.getItem('jwtToken')){
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'))

    if(decodedToken.exp * 1000 <Date.now()){
        localStorage.removeItem('jwtToken')
    }else{
        initialState.user = decodedToken;
        
    }
}

const AuthContext = createContext({
    user: null,
    login:(userData) => {},
    register:(userData) => {},
    logout: () => {} 
})

function authReducer(state, action){
    switch(action.type){
        case 'LOGIN':
            return{
                ...state,
                user:action.payload
            }
        case 'REGISTER':
            return{
                ...state,
                user:action.payload
            }
        case 'LOGOUT':
            return{
                ...state,
                user: null 
            }
        default:
            return state;
    }
}

function AuthProvider(props){
    const [state, dispatch] = useReducer(authReducer, initialState);
    function register(userData){
        dispatch({
            type:'REGISTER',
            payload: userData 
        })
    }
    function login(userData){
        localStorage.setItem('jwtToken', userData.token)
        dispatch({
            type: 'LOGIN',
            payload: userData 
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
            value = {{user: state.user, login, logout,register}}
            {...props}
        />
    )
}

export {AuthContext, AuthProvider}