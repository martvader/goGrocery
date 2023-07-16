import React,{useState} from 'react';
import Dashboard from '../Dashboard';
import ProductList from '../ProductList';
import Footer from '../Footer'

const AdminNav = () => {
    const [currentTab,setCurrentTab] = useState("Add product")
    const [active, setActive] = useState("Add product")
   
    const tabList = [
        {
            name:"Add product",
            label:"Add product",
            content:(
                <div>
                    <Dashboard />
                </div>
            )
        },
        {
            name:"View store",
            label:"View store",
            content:(
                <div style={{
                    position:"relative",
                    right:"40vw"
                }}>
                    <ProductList />
                </div>
            )
        }
        
    ]
    return (
        <div>
            {tabList.map((tab,i) => (
            <div>   
            <button 
                key={i}
                onClick={(i) => {
                    setCurrentTab(tab.name)
                }}
                style={{
                    position:"relative",
                    border:"none",
                    height:"3vh",
                    top:"5vh",
                    left:"20vw",
                    display:"flex",
                    float:"left",
                    marginLeft:"5vw", 
                    cursor:"pointer"            
                }}
                >
                    {tab.label}     
                </button>
            </div>
            ))}
            {tabList.map((tab, i) => {
                if(tab.name === currentTab){
                    return <div key={i} style={{
                        position:"relative",
                        top:"9.4vh"
                    }}> {tab.content}  </div>
                }
           })}
           
        </div>
    )
}


export default AdminNav;