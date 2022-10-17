import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { GlobalContext } from './GlobalContext'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

    const{register,handleSubmit}=useForm()
    const {Logindata}= useContext(GlobalContext)
    const navigate = useNavigate()

    useEffect(()=>{
      if(Logindata){
      navigate('/')
      }
    })

    const onSubmit = async(data)=>{
      try {
        const resP= await axios.post(`http://localhost:2006/register`,{
          name:data.Name,
          email:data.Email,
          password:data.Password
        })
        console.log(resP.data)
        localStorage.setItem('signupdata',JSON.stringify(resP.data))
        navigate('/login')
      } catch (error) {
        alert(error.message)
      }
     
    }

  return (

    <div className='signupfrom'>
        <h2 className='inputsignup'>SignUp</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
        <input className='inputsignup' type='text' autoComplete='off'  {...register("Name")} placeholder='Enter Name'/>
        <input className='inputsignup' autoComplete='off' type='email' {...register("Email")} placeholder='Enter Email'/>
        <input className='inputsignup' autoComplete='off' type='password' {...register("Password")} placeholder='Enter Password'/>
        <button id='inputsignupbtn' autoComplete='Off' type='submit'>Signup</button>
        </form>
        I have an account!<Link id='gotosignup' to='/login'>Login</Link>
    </div>
  )
}

export default SignUp;
