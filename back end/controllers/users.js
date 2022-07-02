const user=require('../models/user')
const Msg=require('../models/msg')
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signup=(req,res)=>{
    //console.log(req);
    const{name,email,phone,password}=req.body
    const saltRounds=10
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                console.log(`unable to create new user`);
                res.json({message:`unable to create new user`});
            }
            user.create( {name,email,phone,password:hash} )
            .then(()=>{
                res.json({message:'user created '})
            })
            .catch((err)=>{
                res.json({sucess:false, message:'email already exist'})
            })
        });
    });
}

function generateAccessToken(id) {
    return jwt.sign(id ,process.env.TOKEN_SECRET);
}

exports.login = (req, res) => {
    const { email, password } = req.body;
    //console.log(password);
    user.findAll({ where : { email }}).then(user => {
        if(user.length > 0){
            bcrypt.compare(password, user[0].password, function(err, response) {
                if (err){
                console.log(err)
                return res.json({success: false, message: 'Something went wrong'})
                }
                if (response){
                    console.log(JSON.stringify(user))
                    const jwttoken = generateAccessToken(user[0].id);
                    res.json({token: jwttoken, success: true, user:user, message: 'Successfully Logged In'})
                // Send JWT
                } else {
                // response is OutgoingMessage object that server response http request
                return res.status(401).json({success: false, message: 'passwords do not match'});
                }
            });
        } else {
            return res.status(404).json({success: false, message: 'email do not match'})
        }
    })
}

exports.postmsg=(req, res)=>{
    const {username, msg, userId , groupid} = req.body
    console.log(req.body)

    Msg.create( { username, msg , userId , groupid} )
    .then(()=>{
       return  res.status(200).json({sucess:true , message:'msg added to databasse '})
    })
    .catch((err)=>{
       return  res.status(402).json({sucess:false , message:'unable to store '})
    })
}

exports.getmsges=(req, res)=>{
    const {groupid}=req.body
    console.log(groupid)
    Msg.findAll({where : {groupid:groupid}})
    .then(msges=>{
        return res.status(200).json({msges, success: true})
    })
    .catch((err)=>{
        return res.status(402).json({ error: err, success: false})
    })
}
exports.getusers=(req, res)=>{
    user.findAll()
    .then(users=>{
        return res.status(200).json({users, success: true})
    })
    .catch((err)=>{
        return res.status(402).json({ error: err, success: false})
    })
}
