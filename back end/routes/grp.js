const express = require('express')
const grpcontrollers=require('../controllers/grps')

const router=express.Router()

router.get('/getgrp',grpcontrollers.getgrp)

router.post('/makegrp', grpcontrollers.makegrp)


module.exports=router
