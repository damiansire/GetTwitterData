const express = require("express");
const cors = require("cors");
const app = express();

const {
    getAllTweets,
    getCountsByUsers
} = require("./controllers/tweets");

//Middlewares
app.use(cors({ origin: "*" }));

//Routes

//Devuelve todos los tweets
app.get("/api/v1/tweets", getAllTweets);

//Devuelve todos los tweets
app.get("/api/v1/tweets/counts", getCountsByUsers);



//Starting the server
const port = process.env.PORT || 3005;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});