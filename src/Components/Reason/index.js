import React from 'react';
import '../Style.css'
import {Popular} from '../../util/store'

const Reason = () => {
    return(
        <div className='resCat'>
            <div className="resHeader">
                Our featured groceries
            </div>
                {Popular.map((item,i) => (
                    <div key={i} className='resShop'>
                        <img src={item.link} style={{
                            position:"relative",
                            right:"4vw",
                            top:"5vh",
                            width:"5vw",
                            height:"10vh",
                            
                        }} />
                    <div className='resDetails'>
                        {item.item}
                    </div>
                    </div>
                ))}
        </div>
    )
}

export default Reason;