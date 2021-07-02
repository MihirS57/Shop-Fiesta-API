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
const customers = require('./routes/customers');

app.use(express.json())
app.use(morgan('dev'))

//route use
app.use('/api/v1/auth',auth);
//app.use('/api/v1/customers',customers);

app.use(errorHandle);
const server = app.listen(PORT, () => {
    console.log('App listening on port ',PORT);
});


process.on('unhandledRejection',(err,promise) =>{
    console.log(err.name);
    server.close(()=>process.exit(1));
})