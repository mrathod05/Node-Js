import { useForm } from 'react-hook-form'
import {useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const AddProduct = () => {
    const { register, handleSubmit,reset,formState: { errors } } = useForm()
    const { id } = useParams()
    const navigate = useNavigate()



    useEffect(()=>{
    if(id)
    getdata()
    },[])  // eslint-disable-line react-hooks/exhaustive-deps


    // const onFileChange = (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.result
    //     reader.onloadend = function (e) {
    //         if(!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
    //             toast.error("Invalid image content.")
    //         } else {
    //             setImage(reader.result)
    //         }
    //     }
    // }

    const onSubmit = async (data) => {
        const Owner = JSON.parse(localStorage.getItem('Logindata'))
        console.log('dfsafsafsaf',Owner.name)


        if(!id){
        try {
        const resAddP = await axios.post('http://localhost:2006/addP', {
                name: data.Name,
                category: data.Category,
                company: data.Company,
                price: data.Price,
                owner: Owner.name
            },{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('Token'))}`
                }
            })
            console.log(resAddP.data)
            navigate('/')
        } catch (error) {
            alert(error.message)
        }
    }
    else{
        try {
            const resUP  = await axios.put(`http://localhost:2006/products/${id}`,{
                name: data.Name,
                category: data.Category,
                company: data.Company,
                price: data.Price
            },{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('Token'))}`
                }
            })
            console.log(resUP.data)
            navigate('/')
        } catch (error) {
            alert(error.message)
        }
    }
    }
    const getdata= async ()=>{
        try {
            const resUP = await axios.get(`http://localhost:2006/products/${id}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('Token'))}`
                }
            })
                console.log(resUP.data)
                
                reset({
                    Name:resUP.data.name,
                    Category:resUP.data.category,
                    Company:resUP.data.company,
                    Price:resUP.data.price,
                    })

            } catch (error) {
                alert(error.message)
            }
        }
   





    return (
        <>

            <>
                {
                    id === undefined ?
                        <>
                            <div className='AddProductform'>

                                <h2 className='ApH2'>Add Product</h2>

                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <input className='inputsignup' autoComplete='off' type='text' {...register("Name", { required: "Required*", message: "Required*" })} placeholder='Enter product name' />
                                    {errors.Name && <small className='required' >{errors.Name.message}</small>}

                                    <input className='inputsignup' autoComplete='off' type='text' {...register("Category", { required: "Required*", message: "Required*" })} placeholder='Enter product category' />
                                    {errors.Category && <small className='required'>{errors.Category.message}</small>}

                                    <input className='inputsignup' autoComplete='off' type='text' {...register("Company", { required: "Required*", message: "Required*" })} placeholder='Enter product company' />
                                    {errors.Company && <small className='required'  >{errors.Company.message}</small>}

                                    <input className='inputsignup' autoComplete='off' type='text' {...register("Price", { required: "Required*", message: "Required*" })} placeholder='Enter product price' />
                                    {errors.Price && <small className='required' >{errors.Price.message}</small>}

                                    {/* <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="validatedCustomFile" />
                                     </div> */}

                                    <button id='Apbtn' autoComplete='Off' type='submit'>Add</button>
                                </form>
                            </div>

                        </>
                        :
                        <>
                            <div className='UProductform'>
                            
                                <h2 id='UpH2'>Update Product</h2>

                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <input  autoComplete='off' type='text' {...register("Name", { required: "Required*", message: "Required*" })} placeholder='Enter product name' />
                                    {errors.Name && <small className='required' >{errors.Name.message}</small>}

                                    <input  autoComplete='off' type='text' {...register("Category", { required: "Required*", message: "Required*" })} placeholder='Enter product category' />
                                    {errors.Category && <small className='required'>{errors.Category.message}</small>}

                                    <input  autoComplete='off' type='text' {...register("Company", { required: "Required*", message: "Required*" })} placeholder='Enter product company' />
                                    {errors.Company && <small className='required'  >{errors.Company.message}</small>}

                                    <input  autoComplete='off' type='text' {...register("Price", { required: "Required*", message: "Required*" })} placeholder='Enter product price' />
                                    {errors.Price && <small className='required' >{errors.Price.message}</small>}

                                    {/* <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="validatedCustomFile" />
                                    </div> */}
                                    
                                    <button id='Upbtn' autoComplete='Off' type='submit'>Update</button>
                                </form>
                            </div>
                        </>
                }
            </>
        </>
    )
}

export default AddProduct
