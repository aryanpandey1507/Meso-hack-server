const express = require('express');
const cors = require('cors');
const user=require('./routes/userRoutes');
require('dotenv').config();

const app = express();

var corsOptions = {
    origin:'*'
}

app.use(cors(corsOptions))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use('/api/v1',user);


app.get('/',(req,res)=>{
    res.json({message:'hello from API'})
})


const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server is running `)
})