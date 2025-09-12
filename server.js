require('dotenv').config();
const userRouter = require('./routes/user');
const express = require('express');
const PORT = process.env.PORT || 1234;
const mongoose =  require('mongoose');


const app = express();
const db = process.env.DB_URI

app.use(express.json());
app.use('/api/v1', userRouter)


mongoose.connect(db).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is running on the PORT: ${PORT}`);
    })
    console.log('Connection to the database has been established successfully.');
}).catch((error)=>{
    console.log(`Error connecting to the database: ${error.message}`);
})