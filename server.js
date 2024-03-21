const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with the specific origin you want to allow
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Connect to MongoDB
const uri = 'mongodb+srv://dona:uq5vlQ5JcW1yn2jj@cluster0.kpg2ka3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // replace with your MongoDB connection string
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.post('/saveData', async (req, res) => {
    try {
        await client.connect();


        const database = client.db('databs'); // replace with your database name
        const collection = database.collection('collect'); 

        // Insert form data into MongoDB
        const result = await collection.insertOne(req.body);
        console.log(`Data saved with ID: ${result.insertedId}`);

        res.status(200).json({ message: 'Data saved successfully!' });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
