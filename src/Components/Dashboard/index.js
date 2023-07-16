import React,{useState,useContext} from 'react';
import './style.css';
import {Button} from '@material-ui/core'
import {useMutation} from '@apollo/client'
import {AuthContext} from '../../context/Adminauth'
import {ADD_PRODUCT,GET_PRODUCTS} from '../../util/graphql'

const Dashboard = () => {
    const [price, setPrice] = useState();
    const [productName, setProductName] = useState("")
    const [image, setImage] = useState(null)
    const [imgData, setImgData] = useState(null)
    const [showPreview, setPreview] = useState(false)
    const [visible, setVisible] = useState("hidden")
    const [status,setStatus] = useState("");
    const {admin,logout} = useContext(AuthContext)

    const hadndleReset = () => {
        setImage(null)
        setPrice('')
        setProductName('')
        setStatus('')
    }

    

    const handleImage= (e) => {
        setImage(e.target.files[0]);
        setImgData(URL.createObjectURL(e.target.files[0]))
        setVisible("visible")
        if(!image) return;
        if(image.size >= 100000){
            return(
                <div>
                    <p>Image file too large</p>
                </div>
            )
        }
    }

    const [addProduct,{loading,error}] = useMutation(ADD_PRODUCT,{
        onError:(error => console.log("Something went wrong",error)),
        update(){
            hadndleReset()
        },
        refetchQueries:[{
            query:GET_PRODUCTS,
            variables:{
                skip:0,
                limit:0
            }
        }]  
    })

    const handleSubmit = async (e) => {
        try{
            if(admin){
                e.preventDefault();
                await addProduct({variables:{
                    productName,
                    price,
                    status,
                    image
                }})
                alert(`${productName} added succesfully`)
                hadndleReset()
            }
        }catch(e){
            alert("Something went wrong",e)
        }
    }

    return (
        <div className='moveAdd'>
            <div className="logOut" onClick={logout}>
                Logout
            </div>
            <div className="addListing">
                <div className="inputGroup">
                    <div className="labelProduct">
                        Name
                    </div>
                    <input 
                        onChange={(e) => {
                            setProductName(e.target.value)
                        }}
                        className="inputHolders"
                        type='text'
                        placeholder='product name'
                    />
                    <div className="labelProduct"> 
                        Price
                    </div>
                    <input 
                        onChange={(e) => {
                            setPrice(parseInt(e.target.value))
                        }}
                        className='inputHolders'
                        type='text'
                        placeholder='price'
                    />
                    <div className="labelProduct">
                        Status
                    </div>
                    <select
                        className='inputHolders'
                        onChange={(e)=>{
                            setStatus(e.target.value)
                        }}
                    > 
                        <option>In_stock</option>
                        <option>Out_of_stock</option>
                    </select>
                    <div className="labelProduct">
                        Image
                    </div>
                    <input 
                        className="inputHolders"
                        type="file" 
                        onChange={handleImage} 
                    />
                </div>
                <Button onClick={handleSubmit} className='addButton' style={{textTransform:"none"}}>Add item</Button>
                
            </div>
            <div>
                <img src={imgData} style={{
                    position:"relative",
                    width:"19vw",
                    height:"35vh",
                    top:"30vh",
                    right:"5vw",
                    visibility:visible
                }} />
            </div>
        </div>
    )
}

export default Dashboard;