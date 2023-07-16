import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import {GET_PRODUCT} from '../util/graphql';
import {Button} from '@material-ui/core'
import './style.css';

const Product  = () => {
    const {productId} = useParams();
    const {data:getProduct,loading} = useQuery(GET_PRODUCT,{
        variables:{
            productId
        },
        fetchPolicy:'cache-and-network'
    }) 
    let productItem;
    if(loading){
        productItem = <div>....</div>
    }
    if(!getProduct){
        productItem = <div>Store empty sorry</div>
    }else{
        const {
            getProduct:{id,productName,price,status,image}
        } = getProduct;
        
        productItem=(
            <div className='moveProduct'>
                {
                <div>
                    <div>
                        <img src={image} style={{
                            position:"relative",
                            width:"20vw",
                            top:"20vh",
                            height:"40vh",
                            right:"15vw"
                        }} />
                    </div>
                    <div style={{
                        position:"relative",
                        fontWeight:"800",
                        bottom:"25vh",
                        left:"50vw",
                        fontSize:"2vw",
                        width:"20vw"
                    }}>
                        {productName}
                    </div>
                    <div style={{
                        position:"relative",
                        fontWeight:"200",
                        bottom:"20vh",
                        left:"13vw"
                    }}> 
                        {status}
                    </div>
                    <div style={{
                        position:"relative",
                        fontWeight:"200",
                        fontSize:"2vw",
                        bottom:"15vh",
                        left:"14.1vw"
                    }}>
                       ksh{price}
                    </div>
                    <Button style={{
                        position:"relative",
                        left:"13.1vw",
                        bottom:"10vh",
                        textTransform:"none",
                        backgroundColor:"white",
                        border:"solid",
                        borderColor:"white",
                        color:"white",
                        backgroundColor:"skyblue",
                    }}>
                        Buy now
                    </Button>
                </div>
                }
            </div>
        )
    }
    return productItem;
}

export default Product;