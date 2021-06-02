// IMPORTS AT THE TOP
const express = require("express")
const Dog = require("./dog-model.js")
//const {findAll, findById, update} = require("./dog-model.js")

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

// ENDPOINTS



// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get("/api/dogs/:id",(req,res)=>{
    const idVar = req.params.id
    Dog.findById(idVar)
        .then(dog =>{
            if(!dog){
                res.status(404).json("Dog doesn't exist")
            }else{
                res.json(dog)
            }            
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
})

// [GET] /api/dogs (R of CRUD, fetch all dogs)
server.get("/api/dogs", (req,res)=>{
    Dog.findAll()
        .then(dogs =>{
            console.log(dogs)
            res.status(200).json(dogs)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
})

// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
server.post("/api/dogs", (req,res)=>{
    const newDog = req.body
    if(!newDog.name || !newDog.weight){
        res.status(422).json("Need name and weight")
    }else{
        Dog.create(newDog)
        .then(dog=>{
            res.status(201).json(dog)
        })
        .catch(err=>{
            res.status(500).json({message:err.message})
        })
    }    
})
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put("/api/dogs/:id", async (req,res)=>{
    const {id} = req.params
    const changes = req.body
    try{
        const updatedDog = await Dog.update(id,changes)
        res.status(200).json(updatedDog)
    }catch(err){

    }
})
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// [GET] / (Hello World endpoint)
server.use("*",(req,res)=>{
    res.status(404).json({message:"404 Not Found!!!"})
})

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server