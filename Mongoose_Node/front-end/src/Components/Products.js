import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
// import { GlobalContext } from './GlobalContext';
import {debounce} from 'lodash';


const Products = () => {
    const [Pdata, setPdata] = useState()
    //const [Udata, setUdata] = useState([])
    // const {Logindata}= useContext(GlobalContext)
    const navigate = useNavigate()

    useEffect(() => {
        getPdata()
    }, [])

    const getPdata = async () => {
        try {
            const resP = await axios.get('http://localhost:2006/products',{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('Token'))}`
                }
            })
            console.log("Products",resP.data)
            setPdata(resP.data)
            // Owner()
        } catch (error) {
            alert(error.messege)
        }
    }
    //   const Owner = async()=>{            
    //       try {
    //           const resU = await axios.get(`http://localhost:2006/agg`,{
    //             headers:{
    //                 authorization:`bearer ${JSON.parse(localStorage.getItem('Token'))}`
    //             }
    //         })
    //           console.log(resU.data)
    //           setUdata(resU.data)
    //       } catch (error) {
    //           console.log(error)
    //       }
    //  }
    const deleteP =async(id)=>{
        console.log(id)
        try {
        const resD = await axios.delete(`http://localhost:2006/products/${id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('Token'))}`
            }
        })
        console.log("Delete",resD.data)
        if(resD){
            getPdata()
        }
         } catch (error) {
             alert(error.messege)
         }
    }

    const SearchHandle =debounce( async(e)=>{
        console.log(e.target.value)
        let key = e.target.value
        try {
            if(key){
            let reS = await axios.get(`http://localhost:2006/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('Token'))}`
                }
            })
            console.log(reS.data)

            if(reS.data){
            setPdata(reS.data)}
            }
            else{
                getPdata()
            }
        } catch (error) {
            console.log(error.messege)
            alert(error.messege)
        }

    },500)


    return (
        <>
        <div className='contener'>
        <div>
            <input type='text' className='searchbar' placeholder='Search here' onChange={SearchHandle} />
        </div>
        <div className='Card-P'>
        <Container>
            <Row>
            {

                Pdata?.length>0?Pdata?.map((P) => {
                    //let id = data.map(({userId})=>userId)
                    return (
                        <div className='mx-2 my-3 ' key={P._id} >
                        <Col key={P._id}>
                            <Card style={{ width: '18rem' } } className='Card' >
                                {console.log("Imgaeeeee",P.image)}
                                <Card.Img variant="top" src={P.image}/>
                                <img id='imgg' alt='helo'  src={P.image}/>
                                <Card.Body>
                                    <Card.Title>Name:{P.name}</Card.Title>
                                    <Card.Title>Category:{P.category}</Card.Title>
                                    <Card.Title>Company:{P.company}</Card.Title>
                                    <Card.Title>Price:{P.price}</Card.Title>
                                    
                                    <Card.Title>Owner:{P.owner}</Card.Title>
                                    <Button id='btn-P' onClick={()=>{navigate(`/updateproducts/${P._id}`)}}variant="info">Update</Button>
                                    <Button id='btn-P' onClick={()=>deleteP(P._id)} variant="danger">Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        </div>

                    )
            })
            :
                <h1>No fild match</h1>
            }
            </Row>
            </Container>
            </div>
            </div>
        </>
    )
}

export default Products
