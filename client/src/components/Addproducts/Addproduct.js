import React, { useState } from 'react'
import './Addproduct.css'
const Addproduct = () => {
    const [name,setname] = useState("")
    const [price,setprice] = useState("")
    const [category,setcategory] = useState("")
    const [company,setcompany] = useState("")
    const [error,seterror] = useState(false);
    const getAddData = async () => {

      if(!name || !price || !category || !company){
        seterror(true);
        return false
      }
        let userId = JSON.parse(localStorage.getItem('users'));
        let result = await fetch("http://localhost:5678/add_product", {
            method:'post',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        if(result) {
          alert("Product Added Successfuly!!")
        }
    }
  return (
    <div className='addproducts'>
       <h1>Add New Product</h1>
      <input type="text" placeholder="Enter product name" value={name} onChange={(e) => setname(e.target.value)} required />
      { error && !name && <span>*Enter Valid Name</span> }
      <input type="text" placeholder="Enter product price in $ " value={price} onChange={(e) => setprice(e.target.value)} required />
      {error && !price && <span>*Enter Price</span> }
      <input type="text" placeholder="Enter product category" value={category} onChange={(e) => setcategory(e.target.value)} required />
      {error && !category && <span>*Enter Category of product</span> }
      <input type="text" placeholder="Enter product company" value={company} onChange={(e) => setcompany(e.target.value)} required />
      {error && !company && <span>*Enter Valid company Name</span> }
      <button className='btn' onClick={getAddData}>Add Product</button>
    </div>
  )
}

export default Addproduct
