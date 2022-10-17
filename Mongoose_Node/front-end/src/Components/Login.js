import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useContext, useEffect } from 'react'
import { GlobalContext } from './GlobalContext'
import {useNavigate ,Link} from 'react-router-dom'

export const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { setUserDetails, signupdata } = useContext(GlobalContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (signupdata) {
            navigate('/')
        }
    },[signupdata])


    const onSubmit = async (data) => {
        try {
            const resL = await axios.post('http://localhost:2006/login', {
                email: data.Email,
                password: data.Password,
            })
                setUserDetails(resL.data)
                navigate('/')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <>
            <div className='signupfrom'>
                <h2 className='header'>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className='inputsignup' autoComplete='off' type='email' {...register("Email", { required: "Required*", message: "Required*" })} placeholder='Enter Email' />
                    {errors.Email && <small className='required'>{errors.Email.message}</small>}
                    <input className='inputsignup' autoComplete='off' type='password' {...register("Password", { required: "Required*", message: "Required*" })} placeholder='Enter Password' />
                    {errors.Password && <small className='required'>{errors.Password.message}</small>}
                    <button id='inputsignupbtn' autoComplete='Off' type='submit'>Login</button>
                </form>
                No Account? <Link to='/signup' >SignUp</Link>
            </div>
        </>
    )

}
