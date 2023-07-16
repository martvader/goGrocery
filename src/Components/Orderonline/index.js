import React,{} from 'react';
import './style.css';
import {FooterImage} from '../../util/store'
const Orderonline = () => {
    return(
        <div className='safeContainer'> 
            <div className='safe'>
                Order <div style={{color:"#2AC858"}}> Grocery online </div>  & stay safe
            </div>
        <div className="offerWrapper">
            <div className='offerHeader'>
                Fresh Grocery 
            </div>
            <div className='offerHeader2'>
                Fast delivery
            </div>
            {FooterImage.map((item,i) => (
                <div style={{
                    backgroundColor:"red",
                    width:"0vw",
                }}>
                    <img src={item.link} className='imageFooter'/>
                </div>
            ))}
        </div>
        </div>
    )
}

export default Orderonline;