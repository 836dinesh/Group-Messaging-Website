const grp=require('../models/grp')

exports.getgrp=(req, res)=>{
    grp.findAll().then(grps=>{
        return res.status(200).json({grps})
    })
    .catch(err=>{
        return res.status(402).json({sucess:false, mesaage:'cant fetch grps'})
    })
}

exports.makegrp=(req, res)=>{
    const {groupname , userId}=req.body
    grp.create({groupname , userId})
    .then(()=>{
        res.json({message:'grp created '})
    })
    .catch((err)=>{
        res.json({sucess:false, message:'unable to create grp'})
    })
}


