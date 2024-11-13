const express=require('express')
const userController=require('./controllers/userController')
const projectController=require('./controllers/projectController')
const jwtmiddleware=require('./middleware/jwtmiddleware')
const multerConfig = require('./middleware/multermiddleware')
// instance router
const router=new express.Router()
// Register
router.post('/register',userController.register)

router.post('/login',userController.login)

// add-project
router.post('/add-project',jwtmiddleware,multerConfig.single('projectimage'),projectController.uploadproject)

router.get('/all-project',jwtmiddleware,projectController.getallprojects)

router.get('/home-project',projectController.gethomeprojects)

router.get('/user-project',jwtmiddleware,projectController.getuserprojects)

router.delete('/remove-userproject/:id',jwtmiddleware,projectController.removeuserprojects)

router.put('/update-userproject/:id',jwtmiddleware,multerConfig.single('projectimage'),projectController.updateuserproject)

router.put('/update-userprofile',jwtmiddleware,multerConfig.single('profile'),userController.updateprofile)


module.exports=router