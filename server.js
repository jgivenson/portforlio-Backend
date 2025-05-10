require('dotenv').config()
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose');
const testimonialRoutes = require('./routes/testimonial');

//express app
const app = express();

//middleware
app.use(express.json());

const CorsOptions={
    origin:["http:localhost:3000"],
    credentials:true,

};
app.use(cors(CorsOptions))
app.use((req,res,next) =>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/testimonials',testimonialRoutes);


//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for request
        app.listen(process.env.PORT,()=>{
            console.log('Connected to the Db and Listening on port ',process.env.PORT)
        })
    })
    .catch((error)=>{
        console.log(error)
    })
