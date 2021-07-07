const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const morgan = require('morgan');
const errorHandle = require('./middleware/error');
dotenv.config({path: './config/config.env'})

const app = express();
const PORT = process.env.PORT;

//connection to db
const connectDb = require('./config/db');
connectDb();

//routes
const auth = require('./routes/auth');
const users = require('./routes/users');
//const customers = require('./routes/customers');
const products = require('./routes/products');
const orders = require('./routes/orders');
//const suppliers = require('./routes/suppliers');
app.use(express.json())
app.use(morgan('dev'))

//route use
app.use('/api/v1/auth',auth);
app.use('/api/v1/users',users);
/*app.use('/api/v1/customers',customers);
app.use('/api/v1/suppliers',suppliers);*/
app.use('/api/v1/products',products);
app.use('/api/v1/orderProduct',orders);

app.use(errorHandle);
const server = app.listen(PORT, () => {
    console.log('App listening on port ',PORT);
});


process.on('unhandledRejection',(err,promise) =>{
    console.log(err.name);
    server.close(()=>process.exit(1));
})

/*
auth: update details, update password, register, login, forgot password, resetpassword
customers: get user profile, get user cart (User), delete account
dealers: get users, create users, get user, update user, delete user
*/