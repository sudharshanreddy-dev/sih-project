const express = require('express')
const router = express.Router()
const {test, registerUser,loginUser,getProfile,logout} = require('../controllers/authcontroller')


router.get('/',test)
router.post('/register',registerUser)
router.post('/login',loginUser);
router.get('/profile',getProfile);
router.post('/logout',logout);


module.exports = router