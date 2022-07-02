//dependencies
const express=require('express')
const cors=require('cors')
const sequelize=require('./utils/database');



//dataabse tables 
const user = require('./models/user');
const msg=require('./models/msg')
const grp=require('./models/grp')




//routes dependencies
const userRoute=require('./routes/user')
const grpRoute=require('./routes/grp')

const app=express()
app.use(cors())

app.use(express.json());


//routes
app.use('/user', userRoute)
app.use('/grp', grpRoute)


//Associations
user.hasMany(msg)
msg.belongsTo(user)

user.hasMany(grp)
grp.belongsTo(user);

//sequelize.sync({force:true})
sequelize.sync()
.then(() => {
    app.listen( 4000)
console.log(`table created`);
}).catch((err) => {
    console.log(`Error `,err);
})



