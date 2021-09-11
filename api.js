const express = require("express");
const cors = require("cors");
const app = express();

const {
    getAllTweets
} = require("./controllers/tweets");

//Middlewares
app.use(cors({ origin: "*" }));

//Routes

//Devuelve todos los tweets
app.get("/api/v1/tweets", getAllTweets);


//Starting the server
const port = process.env.PORT || 3005;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});