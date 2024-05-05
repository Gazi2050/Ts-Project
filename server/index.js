const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors({
    origin: ['http://localhost:5173', 'https://blog99.surge.sh']
}));
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qemc4ul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        //Collections
        const blogCollection = client.db('server').collection('blog');

        //blog related api
        app.get('/blogs', async (req, res) => {
            const result = await blogCollection.find().toArray();
            res.send(result);
        });

        app.get('/blogs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await blogCollection.findOne(query);
            res.send(result);
        })

        app.post('/blogs', async (req, res) => {
            const blog = req.body;
            // console.log(blog);
            const result = await blogCollection.insertOne(blog);
            res.send(result);
        });

        app.put('/blogs/:id', async (req, res) => {
            const id = req.params.id;
            const blog = req.body;
            // console.log(id, blog);
            const filter = { _id: new ObjectId(id) }
            const option = { upsert: true }
            const updateBlog = {
                $set: {
                    title: blog.title,
                    description: blog.description,
                    updateTime: blog.updateTime
                },
                $unset: {
                    date: 1
                }
            }
            const result = await blogCollection.updateOne(filter, updateBlog, option);
            res.send(result)
        });

        app.delete('/blogs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await blogCollection.deleteOne(query);
            res.send(result);
        });

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send(`<h1 style="text-align:center;font-family:Monospace;">Server Is Running...</h1>
    <h2 style="text-align:center;font-family:Monospace;"><a href='https://server-two-kohl.vercel.app/blogs'>blogs</a></h2>`)
})

app.listen(port, () => {
    console.log(`Server Is Running On Port: ${port}`)
})