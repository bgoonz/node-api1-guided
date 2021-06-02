// IMPORTS AT THE TOP
const express = require("express")
const Dog = require("./dog-model.js")
//const {findAll, findById, update} = require("./dog-model.js")

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())

// ENDPOINTS

// [GET] / (Hello World endpoint)
server.use("*",(req,res)=>{
    res.status(404).json({message:"404 Not Found!!!"})
})

// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
// [GET] /api/dogs (R of CRUD, fetch all dogs)
server.get("/api/dogs")

// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server