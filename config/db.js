const mongoose = require('mongoose');

const connectDb = async () => {
    const conn = await mongoose.connect(process.env.URI_MONGODB,{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useFindAndModify:false
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
}

module.exports = connectDb;