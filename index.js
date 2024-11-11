//import the  libraries
const express=require('express')
const cors=require('cors')
const router=require('./router')
require('dotenv').config()

require('./connection')

//create server
const app=express()

// server using cros
app.use(cors())

// parse the data - middleware -parse the data
app.use(express.json())

// use router
app.use(router)

app.use('/upload',express.static('./uploads'))

//set port number
const port=4000 || process.env.PORT

//listen the server
app.listen(port,()=>{
    console.log(`server running successfully ${port}` )
})


