const projects = require("../model/projectModel")

exports.uploadproject = async (req, res) => {
    // console.log('inside add controller')
    const { title, language, github, website, overview } = req.body

    const projectimage = req.file.filename

    console.log(title, language, github, website, overview)

    // console.log(projectimage)
    const userid = req.payload

    try {
        const existingproject = await projects.findOne({ website })
        if (existingproject) {
            res.status(406).json("project already exist")
        } else {
            const newproject = new projects({
                title, language, github, website, overview, projectimage, userid
            })
            await newproject.save()
            res.status(200).json(newproject)

        }

    } catch (err) {
        res.status(401).json("project adding failed due to", err)

    }

}
exports.gethomeprojects = async (req, res) => {

    try {
        const allprojects = await projects.find().limit(3)
        res.status(200).json(allprojects)


    } catch (err) {
        res.status(401).json(err)

    }


}

exports.getuserprojects = async (req, res) => {

    try {
        const userid = req.payload
        const getuserprojects = await projects.find({ userid })
        res.status(200).json(getuserprojects)


    } catch (err) {
        res.status(401).json(err)

    }


}

exports.getallprojects = async (req, res) => {
    const searchkey = req.query.search

    const query = {
        language: {
            $regex: searchkey, $options: "i"
        }

    }

    try {

        const getuserprojects = await projects.find(query)
        res.status(200).json(getuserprojects)


    } catch (err) {
        res.status(401).json(err)

    }


}
// remove user project

exports.removeuserprojects = async (req, res) => {
    const { id } = req.params
    try {
        await projects.findByIdAndDelete({ _id: id })
        res.status(200).json('deleted successfully')

    } catch (err) {
        res.json(401).json(err)

    }

}

// update userprojects

exports.updateuserproject = async (req, res) => {
    const { title, language, github, website, overview, projectimage} = req.body
    const { id } = req.params
    const userid = req.payload
    const uploadedimage=req.file?req.file.filename:projectimage

    try {
        const existingproject=await projects.findByIdAndUpdate({_id:id},{
            title,
            language,
            github,
            website,
            overview,
            projectimage:uploadedimage,
            userid

    },{new:true})
    await existingproject.save()
    res.status(200).json(existingproject)


    } catch (err){
        res.status(401).json(err)

    }
}