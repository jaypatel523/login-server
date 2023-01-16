require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/main');
const connectDB = require('./db/connect');
const cors = require('cors');


// look for the requested which has content type json 
app.use(express.json());
app.use(cors());
app.use('/api/v1', routes);
app.get('/home', (req, res) => {
    res.send("Home page");
})





const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => console.log("server is running..."));
    } catch (error) {
        console.log(error);
    }
}
start();