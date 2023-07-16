import React from 'react';
import {useQuery} from '@apollo/react-hooks'
import {GET_PRODUCTS} from '../../util/graphql'
import './style.css'
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const Layout = ({product}) => {
    const navigate = useNavigate()

    const handleNavigate = (id) => {
        navigate(`/buyitem/${id}`)
    }
    return(
        <div>
            {product.map(({id,productName,image,price}) => (
                    <div>
                        {
                            image == null ?  <div style={{
                                visibility:"hidden"
                            }}>  </div> :
                            <div className="productWrapper" 
                                onClick={() => handleNavigate(id)}
                                key={id}
                            >
                                <img src={image} style={{position:"relative",top:"10vh",width:"8vw", height:"15vh"}}  /> 
                                <div style={{
                                    position:"relative",
                                    top:"14vh",
                                    left:"3vw",
                                    width:"9vw",
                                    fontSize:"0.9vw"
                                }}>
                                    ksh {price}
                                </div>
                            </div>
                        }
                    </div>
            ))}
        </div>
    )
}

const ProductList = () => {
    const {loading,data,error} = useQuery(GET_PRODUCTS,{
        variables:{
            skip:0,
            limit:0
        }
    })
    if(error){
        return(
            <div>
                Something went wrong
            </div>
        )
    }
    if(loading){
        return(
            <div>
                Loading ....{loading}
            </div>
        )
    }
    if(data){
        return(
            <div>
                <Layout product={data.getProducts|| []} />
            </div>
        )
    }
}

export default ProductList;