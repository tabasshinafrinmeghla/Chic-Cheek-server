const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

// console.log(process.env.DB_User);
// console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_PASS}@cluster0.ymhxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const productCollection = client.db("productDB").collection("product");
    // create collection which is blog
    const blogCollection = client.db("productDB").collection("blog");

    app.get("/product", async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // for update product
    app.get("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });

    app.post("/product", async (req, res) => {
      const newProduct = req.body;
      console.log(newProduct);
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    });

    app.put("/product/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const optional = { upsert: true };
      const updateProduct = req.body;
      const Product = {
        $set: {
          name: updateProduct.name,
          available: updateProduct.available,
          brand: updateProduct.brand,
          price: updateProduct.price,
          category: updateProduct.category,
          details: updateProduct.details,
          photo: updateProduct.photo,
        },
      };

      const result = await productCollection.updateOne(
        filter,
        Product,
        optional
      );
      res.send(result);
    });

    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });
    // blog routes
    app.get("/blog", async (req, res) => {
      const cursor = blogCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.findOne(query);
      res.send(result);
    });

    // app.post("/blog", async (req, res) => {
    //   const newBlog = req.body;
    //   console.log(newBlog);
    //   const result = await blogCollection.insertOne(newBlog);
    //   res.send(result);
    // });

    app.post("/blog", async (req, res) => {
      const newBlog = req.body;
      console.log(newBlog);
      const result = await blogCollection.insertOne(newBlog);
      res.send(result);
    });

    app.put("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const optional = { upsert: true };
      const updateBlog = req.body;
      const blogUpdate = {
        $set: {
          title: updateBlog.title,
          content: updateBlog.content,
          author: updateBlog.author,
          date: updateBlog.date,
          tags: updateBlog.tags,
        },
      };

      const result = await blogCollection.updateOne(
        filter,
        blogUpdate,
        optional
      );
      res.send(result);
    });

    app.delete("/blog/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await blogCollection.deleteOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("glow in your make up");
});

app.listen(port, () => {
  console.log(`collection of makeup iteam on port: ${port}`);
});
