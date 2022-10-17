import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from './GlobalContext'
import logo from './logo.jpg'
const Navbar = () => {
  const {Logindata}=useContext(GlobalContext)
  let user = JSON.parse(localStorage.getItem('Logindata'))
  const navigate = useNavigate
  const logout=()=>{
    localStorage.clear()
    navigate('/login')

  }

  return (
  <>
    <nav className='primary'>
      <img className='logo' alt='logo' src={logo}/>
      {(Logindata===null)?
      <>
      <Link to='/signup'>SignUP</Link>
      <Link to='/aboutus'>About Us</Link>
      <Link  to='/contect'>Contect Us</Link>
      </>
      :
      <>
      <Link to='/'>Products</Link>
      <Link to='/addproducts'>Add Proucts</Link>
      <Link to='/profile'>Profile</Link>
      <Link onClick={logout} to='/login'>logout  (MR.{user.name})</Link>
      {/* <h1 className='primary signupdataname'>User:-{signupdata?.name}</h1> */}
      </>
      }
    </nav>
  </>    
  )
}

export default Navbar
