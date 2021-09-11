const Twit = require('twit');
const { Client } = require('pg');

const { dbKeys } = require('./notocar/dbconfig');

//const query = "CREATE TABLE Tweets (usuario varchar(255), tweet varchar(255));";

const execute = (query) => {
    const client = new Client(dbKeys);
    client.connect();
    client.query(query, (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
        }
        client.end();
    });
}

const selectTweets = () => {
    const query = "SELECT * FROM Tweets;";
    execute(query);
}

const insertTweet = (user, message) => {
    const queryText = 'INSERT INTO Tweets(usuario, tweet) VALUES($1, $2) RETURNING *'
    const values = [user, message]
    const client = new Client(dbKeys);
    client.connect();
    client
        .query(queryText, values)
        .then(res => {
            console.log(res.rows[0])
            client.end();
        })
        .catch(e => console.error(e.stack))

}

exports.insertTweet = insertTweet;
exports.selectTweets = selectTweets;
