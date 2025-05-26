const express=require('express')
const routes = express.Router();

routes.get('/:id',(req,res)=>{
    res.send("URL is "+req.params.id)
})

module.exports=routes;