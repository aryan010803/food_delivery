const express = require('express');
const app = express();
const mongoDB = require('./db')
const cors = require('cors');
mongoDB();
app.use(cors());
app.use(express.json())
const port  = 5000;
app.get('/' , (req,res)=>{
    res.send("hello");
})
app.use('/api',require('./routes/CreateUser'));
app.use('/api',require('./routes/DisplayData'));
app.use('/api',require('./routes/OrderData'));
app.listen(port,()=>{
    console.log(`listning on port ${port}`);
})