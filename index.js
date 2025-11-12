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

    const db=client.db('movieMasterPro');
    const collections=db.collection('movies');
    const usersCollection=db.collection('users');

    //user database
    app.post('/users', async(req,res)=>{
      const newUser=req.body;
      const email=req.body.email;
      const query={email:email};
      const existingUser=await usersCollection.findOne(query);
      if(existingUser){
        res.send({message:'user already exits'});
      }
      else{
        const result=await usersCollection.insertOne(newUser);
        res.send(result);
      }
    })



    //movie database
    app.get('/movies', async(req,res)=>{
      const email=req.query.addedBy;
      const query={};
      if(email){
        query.addedBy=email;
      }
            const cursor=collections.find(query);
            const result=await cursor.toArray();
            res.send(result);
        });

    app.post('/movies', async(req,res)=>{
            const newMovie=req.body;
            const result= await collections.insertOne(newMovie);
            res.send(result);
        });

    app.patch('/movies/:id', async(req,res)=>{
            const id=req.params.id;
            const updatedproduct=req.body;
            const query={_id: new ObjectId(id)};
            const update={
                $set:{
                    MovieName:updatedproduct.MovieName,
                    Genre:updatedproduct.Genre,
                    RentPrice:updatedproduct.RentPrice
                }
            }
            const result=await collections.updateOne(query,update);
            res.send(result)
        })

    app.delete('/movies/:id', async(req,res)=>{
            const id=req.params.id;
            const query={_id: new ObjectId(id)};
            const result=await collections.deleteOne(query);
            res.send(result);
        });


    await client.db("admin").command({ ping: 1 });
    console.log("Movie Master Pro successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);

app.listen(port, ()=>{
    console.log('server is running on port', port);
})