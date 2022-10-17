import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/Header.js'
import SignUp from './Components/SignUp'
import Auth from './Components/Auth'
import {useState} from 'react'
import { GlobalContext } from './Components/GlobalContext'
import { Login } from './Components/Login'
import AddProduct from './Components/AddProduct'
import Products from './Components/Products'
import Nopage from './Components/Nopage'

const App = () => {
  const [Logindata,setlogindata]=useState(localStorage.Logindata?JSON.parse(localStorage.Logindata):null)
  
  const setUserDetails = (data)=>{
    setlogindata(data)
    localStorage.setItem('Logindata',JSON.stringify(data.user))
    localStorage.setItem('Token',JSON.stringify(data.auth))
  }

  return (
    <>
    <GlobalContext.Provider value={
      {
      setUserDetails,
      Logindata      
      }}>

    <BrowserRouter>
    <Header/>
     <Routes>

        <Route element={<Auth/>}>
          <Route path='/' element={<Products/>}/>
          <Route path='/addproducts' element={<AddProduct/>}/>
          <Route path='/updateproducts/:id' element={<AddProduct/>}/>
          <Route path='/profile' element={<h2>Profile listing com</h2>}/>
          <Route path='/logout' element={<h2>Logout listing com</h2>}/>
           <Route path='*' element={<Nopage/>}/>

        </Route>

      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>

     </Routes>
    </BrowserRouter>
    </GlobalContext.Provider>
    </>


  )
}

export default App
