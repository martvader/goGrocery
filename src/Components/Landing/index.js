import React,{useState} from 'react'
import {Products} from '../../util/store'
import '../Style.css';

const Landing = () => {
    return(
        <div>
            <div className="logoBanner">
                Gogrocery
            </div>
            <div>
                {Products.map((item,i) => (
                   <div>
                        <div className="itemListing">
                            <img src={item.link} style={{
                                position:"relative", 
                                top:"4vh",
                                width:"11vw",
                                height:"22vh"
                                }} />
                            <div style={{
                                position:"relative",
                                top:"6vh",
                                right:"4vw",
                                fontSize:"0.8vw",
                                color:"black",
                            }}>
                                {item.item}
                            </div>
                            <div style={{
                                position:"relative",
                                right:"2vw",
                                top:"7vh",
                                fontSize:"0.5vw"
                            }}>
                                {item.description}
                            </div>
                         </div>   
                   </div> 
                ))}
            </div>
        </div>
    )
}

export default Landing;