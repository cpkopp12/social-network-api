//DECLARATIONS: express, mongoose ------------------------
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')

//express app ======================
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongodb connection =================
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social_network_api',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

mongoose.set('debug', true);

//use routes and listen --------------------------
app.use(routes);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`))