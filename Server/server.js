const express = require('express');
require('./db/config');
const cors = require('cors')
const User = require('./db/User');
const Products = require('./db/Products')
const jwt = require('jsonwebtoken');
const jwtKey = 'ecomm';
const app = express();
app.use(express.json());
app.use(cors())


app.post("/register", async(req,res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({result},jwtKey,{expiresIn:"2h"}, (err,token) => {
        if(err){
           res.send({result:"Something Went Wrong!!"})
        }
        res.send({result, auth:token});
       })   
})

app.post("/login",async(req,res) => {
    if(req.body.email && req.body.password){
        let user = await User.findOne(req.body).select("-password");
        if(user){
            jwt.sign({user},jwtKey,{expiresIn:"2h"}, (err,token) => {
             if(err){
                res.send({result:"Something Went Wrong!!"})
             }
             res.send({user, auth:token});
            })
        }
        else{
            res.send({result:"Not User Found"});
        }
    }else{
        res.send({result:"Not User Found"});
    }  
})

app.post("/add_product",verifyToken,async (req,res) => {
    let product = new Products(req.body);
    let result = await product.save();
    res.send(result)
})

app.get("/products",verifyToken, async (req,res) => {
    let products = await Products.find();
    if(products.length > 0) {
        res.send(products)
    }
    else {
        res.send({result:"no product found"})
    }
})


app.delete("/product/:id",verifyToken, async (req,res) => {
    let result = await Products.deleteOne({_id:req.params.id});
    res.send(result);
})

app.get("/product/:id",verifyToken, async (req,res) => {
    let result = await Products.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }
    else{
        res.send({result:"result not found!!"})
    }
})
app.put("/product/:id", verifyToken, async (req,res) => {
    let result  = await Products.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    res.send(result);
})

app.get("/search/:key", verifyToken, async (req,res) => {
    let result = await Products.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]
    })
    res.send(result);
})

function verifyToken(req,res,next){
    let token = req.headers['authorization']
    if(token){
      token = token.split(' ')[1];
      jwt.verify(token, jwtKey, (err,valid) => {
        if(err){
            res.status(401).send({result:'Please Valid Token !!'})
        }else{
            next();
        }
      })
    }else{
        res.status(403).send({result:"Please enter the header token!!"});
    }
  
}

app.listen(5678);