import {useState} from 'react'
import '../Style.css'
import Landing from '../Landing'
import Footer from '../Footer';
import Reason from '../Reason';
import ProductList from '../ProductList'
import Orderonline from '../Orderonline';
const Home = () => {
    const [current,setCurrent] = ("white")
    const [currentTab,setCurrentTab] = useState("Grocery")
    const [active, setActive] = useState("Grocery")
    //MY MENU ARRAY
    const ChangeColor = () => {
        setCurrent(!current)
    }

    const tabList = [
        {
            name:"Grocery",
            label:"Grocery",
            content:(
                <div>
                    <Landing />
                    <Reason />
                    <Orderonline />
                    <Footer />
                </div>
            )
        },
        {
            name:"Shop",
            label:"Shop",
            content:(
                <div>
                    <ProductList />
                    <Footer />
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
                    top:"7vh",
                    left:"20vw",
                    backgroundColor:"white",
                    display:"flex",
                    float:"left",
                    marginLeft:"5vw",
                }}
                >
                    {tab.label}     
                </button>
                </div>
            ))}
           {tabList.map((tab, i) => {
                if(tab.name === currentTab){
                    return <div className='contentBelow' key={i}> {tab.content}  </div>
                }
           })}
        </div>
    )
}

export default Home;