const express=require('express');
const cors=require('cors');
const app=express();
const port= process.env.port || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//middleware
app.use(cors());
app.use(express.json());

//password: OiUoKO1Cxg8W8kzD   moviemasterUser
const uri = "mongodb+srv://moviemasterUser:OiUoKO1Cxg8W8kzD@cluster0.dm5zycv.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//root route
app.get('/' , (req, res)=>{
    res.send('Movie Master Pro server is running');
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Movie Master Pro successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, ()=>{
    console.log('server is running on port', port);
})