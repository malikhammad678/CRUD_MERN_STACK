import React, { useEffect, useState } from 'react'
import { useParams , useNavigate } from 'react-router-dom'
const Update = () => {
    const [name,setname] = useState("")
    const [price,setprice] = useState("")
    const [category,setcategory] = useState("")
    const [company,setcompany] = useState("")
    const params = useParams();
    const Navigate = useNavigate();
    useEffect(() => {
        getProductDetails();
    },[])

    const getProductDetails = async () => {
        let result  = await fetch(`http://localhost:5678/product/${params.id}`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
           }
        })
        result = await result.json();
        setname(result.name)
        setprice(result.price)
        setcategory(result.category);
        setcompany(result.company);
    }
    const getupdateData = async() => {
       let result = await fetch(`http://localhost:5678/product/${params.id}`, {
        method:'put',
        body:JSON.stringify({name,price,category,company}),
        headers:{
            'Content-Type': 'application/json',
            authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
       })
       result = await result.json();
       if(result){
        Navigate("/");
       }
    }
  return (
    <div>
      <div className='addproducts'>
       <h1>Update Product</h1>
      <input type="text" placeholder="Update product name" value={name} onChange={(e) => setname(e.target.value)} required />
      
      <input type="text" placeholder="Update product price in $ " value={price} onChange={(e) => setprice(e.target.value)} required />
    
      <input type="text" placeholder="Update product category" value={category} onChange={(e) => setcategory(e.target.value)} required />
      
      <input type="text" placeholder="Update product company" value={company} onChange={(e) => setcompany(e.target.value)} required />

      <button className='btn' onClick={getupdateData}>Update Product</button>
    </div>
    </div>
  )
}

export default Update
