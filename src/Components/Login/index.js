import React,{useContext,useState} from 'react'; 
import './styles.css'
import {useNavigate} from 'react-router-dom'
import {useForm} from '../../util/hooks'
import {AuthContext} from '../../context/Adminauth'
import {ADMIN_LOGIN} from '../../util/graphql'
import { useMutation } from '@apollo/client';
import {Input} from '@material-ui/core'

const Login = () => {

    const context = useContext(AuthContext)
    const [errors, setErrors] = useState({})
  
    const navigate = useNavigate()
    
    const {onChange, onSubmit, values} = useForm(loginUserCallback,{
        username:'',
        password:''
    }) 
    const [loginUser, {loading}] = useMutation(ADMIN_LOGIN,{
        update(_,{data:{adminLogin:adminData}}){
            context.login(adminData) 
            /*if(userData.username == "Administrator"){
                navigate('/dashboard') 
            }*/
            navigate('/dashboard')
        },
        onError(err){
            console.log(err)
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables:values
    })
     
    function loginUserCallback(){
        loginUser();
    }
    return(
    <div>
    <form onSubmit={onSubmit}>
        <div className='entire'>
            <div className="lgnHeader">
                Login 
            </div>
            
            <div className='valEmail'>
                <div
                    style={{
                        position:'relative',
                        fontSize:"1vw",
                        marginBottom:"1vh",
                        right:"7vw"
                    }}
                >
                    Username
                </div>
                <Input
                    type="text"
                    name="username"
                    error={errors.username ? true : false}
                    onChange={onChange}
                    style={{
                        position:"relative",
                        width:"15vw",
                        height:"3vh",
                        right:"2vw"
                    }}
                />
            </div>
             <div className='valPassword'>
                <div style={{
                    position:"relative",
                    marginBottom:"5px",
                    fontSize:"15px",
                    right:"7vw"
                }}>
                    Password 
                </div>
                <Input 
                    type="password"
                    name="password"
                    error={errors.password ? true : false}
                    onChange={onChange}
                    style={{
                        position:"relative",
                        width:"15vw",
                        height:"2vw",
                        right:"2vw"

                    }}
                />
            </div>
            <div className="lgnButton">
                <button style={{
                    position:"relative",
                    width:"8vw",
                    top:"5vh",
                    right:"5.5vw",
                    backgroundColor:"#F8C483",
                    height:"5vh",
                    borderRadius:"0.2vw",
                    fontWeight:"500",
                    boxShadow:"0px 0px 0px 0px rgba(255,255,255,255)"
                }}>
                    Sign In
                </button>
            </div>
            </div>
        </form>
        {Object.keys(errors).length > 0 && (
            <div>
                <ul
                  className="adminError"
                >
                {Object.values(errors).map(value => (
                    <li key={value}> {value} </li>
                ))}
            </ul>
         </div>
        )}
    </div>
    )
}

export default Login;