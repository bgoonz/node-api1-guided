// import the server and start it
const server = require("./api/server.js")

server.listen(1234, ()=>{
    console.log("Server running on 1234")
})