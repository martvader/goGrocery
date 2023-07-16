import {useContext} from 'react'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import {AdminAuth} from './context/Adminauth'
import {AuthProvider} from './context/auth'
import AdminRoutes from './util/AdminRoutes';
import SessRoutes from '../src/util/SessRoutes';
import LogRoutes from './util/LogRoutes';
import Home from './Components/Home';
import AdminNav from './Components/AdminNav';
import Login from './Components/Login';
import Product from './Pages/Product';

const compose  = (providers) => 
providers.reduce((Prev,Curr) => ({children}) => (
    <Prev>
        <Curr>{children}</Curr>
    </Prev>
))

const Provider = compose ([
  AuthProvider,
  Router
])
const AdminProvider = compose ([
  AdminAuth,
  Router
])
const UserView = () => {
  return(
    <Provider>
      <Routes>    
          <Route element={<LogRoutes/>}>
            <Route path ="/" element={<Home />} />
            <Route path="/buyitem/:productId" element={<Product />} />
          </Route>
        </Routes>
    </Provider>
  )
}

const AdminView = () => {
  return(
    <AdminProvider>
      <Routes>
        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<AdminNav />} />
        </Route>
        <Route element={<SessRoutes/>}>
          <Route path="/adminLogin" element={<Login />}/>
        </Route>
      </Routes>
    </AdminProvider>
  )
}
function App() {
  return (
    <div className="App">
      <UserView />
      <AdminView />
    </div>
  );
}

export default App;
