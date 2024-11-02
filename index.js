const express = require('express');
const cors = require ('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware 
app.use(cors());
app.use(express.json());


app.get('/', (req, res)=> {
    res.send('glow in your make up')
} )

app.listen(port, () =>
{
    console.log(`collection of makeup iteam on port: ${port}`)
})