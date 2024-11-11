const mongoose=require('mongoose')

const connectionstring=process.env.DATABASE

mongoose.connect(connectionstring).then(()=>{
    console.log('database connected successfully')
}).catch((err)=>{
    console.log(`mongodb does not connected ${err} `)
})