import React, { useEffect, useState } from 'react'
import './Allproducts.css'
import { Link } from 'react-router-dom';
const Allproducts = () => {
    const [product,setproduct] = useState([]);
    useEffect(() => {
      getProductData();
    },[])

    const getProductData = async () => {
      let result = await fetch("http://localhost:5678/products",{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
      });
      result = await result.json();
      setproduct(result);
    }
     
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5678/product/${id}`, {
            method:'Delete',
            headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = result.json();
        if(result){
            getProductData(); 
        }
    }
    
    const getSearchProduct = async(e) => {
      let key = e.target.value;
      if(key){
      let result = await fetch(`http://localhost:5678/search/${key}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });
      result = await result.json();
      if(result){
        setproduct(result);
      }
    }else{
      getProductData(); 
    }
    }
  return (
    <div className='list'>
      <h1>Product List</h1>
      <input type='text' placeholder='Search Product' className='input' onChange={getSearchProduct}/>
      <ul>
        <li>Sr No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operations</li>
      </ul>
      {
        product.length > 0 ?   product.map((item,index) => {
         return <ul key={item._id}>
        <li>{index + 1}</li>
        <li>{item.name}</li>
        <li>${item.price}</li>
        <li>{item.category}</li>
        <li>{item.company}</li>
        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
            <Link to={`update/${item._id}`}>Update</Link>
        </li>
      </ul>
        })
        : <h1>No Product Found</h1>
      }
    </div>
  )
}

export default Allproducts
