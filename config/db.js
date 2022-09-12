// const config = require('config');
require('dotenv').config();
const mongoose = require('mongoose');
const db = process.env.mongoURI;

//connect to mongo atlas database
const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
        //Exit process with failure
    }
}

module.exports = connectDB;