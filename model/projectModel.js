const mongoose=require('mongoose')

const projectSchema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    language:{
        required:true,
        type:String
    },
    website:{
        required:true,
        type:String
    },
    github:{
        required:true,
        type:String
    },
    overview:{
        required:true,
        type:String
    },
    projectimage:{
        required:true,
        type:String
    },
    userid:{
        required:true,
        type:String
    },

    


})

const projects=mongoose.model("projects",projectSchema)

module.exports = projects