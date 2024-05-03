"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
app.use(cors({
    origin: ['http://localhost:5173']
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
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            yield client.connect();
            //Collections
            const blogCollection = client.db('server').collection('blog');
            //blog related api
            app.get('/blogs', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const result = yield blogCollection.find().toArray();
                res.send(result);
            }));
            app.post('/blogs', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const blog = req.body;
                // console.log(blog);
                const result = yield blogCollection.insertOne(blog);
                res.send(result);
            }));
            app.put('/blogs/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const blog = req.body;
                // console.log(id, blog);
                const filter = { _id: new mongodb_1.ObjectId(id) };
                const option = { upsert: true };
                const updateBlog = {
                    $set: {
                        title: blog.title,
                        description: blog.description,
                        updateTime: blog.updateTime
                    },
                    $unset: {
                        dateTime: 1
                    }
                };
                const result = yield blogCollection.updateOne(filter, updateBlog, option);
                res.send(result);
            }));
            app.delete('/blogs/:id', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const id = req.params.id;
                const query = { _id: new mongodb_1.ObjectId(id) };
                const result = yield blogCollection.deleteOne(query);
                res.send(result);
            }));
            // Send a ping to confirm a successful connection
            yield client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
        }
    });
}
run().catch(console.dir);
app.get('/', (req, res) => {
    res.send(`
    <h1 style="text-align:center;font-family:Monospace;">Server Is Running...</h1>`);
});
app.listen(port, () => {
    console.log(`Server Is Running On Port: ${port}`);
});
