const express=require('express');
const cors=require('cors');
const app=express();
const connect=require('./config/db');

connect();
app.use(express.json());
app.use(cors());

const bookRoute=require('./routes/books');
const userRoute=require('./routes/user');


app.use('/api/book',bookRoute);
app.use('/api/user',userRoute);



const port=process.env.port || 5001;
app.listen(port,()=>{
    console.log(`running on ${port}`);
    
})