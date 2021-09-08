const express = require('express')
const cors=require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gqnwo.mongodb.net/NewPortal?retryWrites=true&w=majority`;

const port=3000

const app = express()
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!')
})




// const { MongoClient } = require('mongodb');

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const NewsCollection = client.db("NewPortal").collection("news");
 app.post('/addNews',(req,res)=>{
  console.log(req.body)
  NewsCollection.insertOne(req.body)})

  app.get('/getNews',(req,res)=>{
    NewsCollection.find({})
    .toArray((err,document)=>{
      res.send(document)
    })
  })
  app.get('/newsDetails/:id',(req,res)=>{
    console.log(ObjectId(req.params.id))
    NewsCollection.find({_id:ObjectId(req.params.id)})
    .toArray((err, documents) => {
      res.send(documents[0])
    })
  })

  app.get('/category/:category',(req,res)=>{
    console.log(req.params.category)
    NewsCollection.find({category:(req.params.category)})
   .toArray((err,document)=>{
     res.send(document)
   })
  })

  
  

  const topNewsCollection = client.db("NewPortal").collection("topNews");
  app.post('/topNews',(req,res)=>{
    console.log(req.body)
    topNewsCollection.insertOne(req.body)
  })
  
 app.get('/getTopNews',(req,res)=>{
   topNewsCollection.find({})
   .toArray((err,document)=>{
     res.send(document)
   })
 })


 const adminCollection = client.db("NewPortal").collection("adminPannel");
 app.post('/addAdmin',(req,res)=>{
   console.log(req.body)
   adminCollection.insertOne(req.body)
 })


 app.get('/admin',(req,res)=>{
   adminCollection.find({})
   .toArray((err,document)=>{
     res.send(document)
   })
 })

});




app.listen(process.env.PORT||port)
