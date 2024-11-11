
const users = require("../model/userModel")
const jwt=require('jsonwebtoken')
exports.register = async (req, res) => {
    // logic

    const { username, email, password } = req.body
    console.log(username, email, password)
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("user already exists")
        } else {
            const newUser = new users({
                username,
                email,
                password,
                profile: '',
                github: '',
                linkedin: ''
            })
            await newUser.save()
            res.status(200).json(newUser)

        }


    } catch (error) {
        res.status(401).json(error)
    }


}
// login
exports.login = async (req, res) => {
    const { email, password } = req.body
    console.log()
    try{
    const existingUser = await users.findOne({ email, password })
    if (existingUser) {
        const token=jwt.sign({userId:existingUser._id},'secretkey')
        res.status(200).json({existingUser,token})


    } else {
        res.status(406).json("incorrect email or password")
    }
    
    }catch(err){
        res.status(401).json(err)

    }
}

