const express=require('express');
const cors=require('cors');
const app=express();
const port= process.env.port || 3000;

//middleware
app.use(cors());
app.use(express.json());

//root route
app.get('/' , (req, res)=>{
    res.send('Movie Master Pro server is running');
});

app.listen(port, ()=>{
    console.log('server is running on port', port);
})