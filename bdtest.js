const { Client } = require('pg');

const { dbKeys } = require('./notocar/dbconfig');

//const query = "CREATE TABLE Tweets (usuario varchar(255), tweet varchar(255));";

const execute = (query) => {
    const client = new Client(dbKeys);
    client.connect();
    return client.query(query, (err, res) => {
        if (err) throw err;
        let tweets = [];
        for (let row of res.rows) {
            console.log(JSON.stringify(row));
            tweets.push(row)
        }
        client.end();
        return tweets;
    });
}

const selectTweets = async () => {
    const client = new Client(dbKeys);
    client.connect();
    const response = await client.query('SELECT * FROM Tweets');
    client.end();
    return response.rows;
}

const selectCountsByUsers = async () => {
    const client = new Client(dbKeys);
    client.connect();
    const response = await client.query('SELECT usuario, count(tweet) FROM Tweets GROUP BY usuario');
    client.end();
    return response.rows;
}


const deleteTweets = () => {
    const query = "DELETE FROM Tweets where tweet=':';";
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
exports.selectCountsByUsers = selectCountsByUsers;