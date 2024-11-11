const jwt=require('jsonwebtoken')
const jwtmiddleware=(req,res,next)=>{
    console.log('inside jwt middleware')
    const token=req.headers['authorization'].split(" ")[1]
    console.log(token)
    try{
        const jwtResponse=jwt.verify(token,'secretkey')
        console.log(jwtResponse)
        req.payload=jwtResponse.userId
        next()


    }catch (err){
        res.status(401).json('authorization failed due to',err)
    }

}
module.exports=jwtmiddleware