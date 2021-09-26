const Twit = require('twit')
const { Client } = require('pg')

if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
})

const client = new Client({
    ssl: {
        rejectUnauthorized: false
    }
});

T.get('search/tweets', { q: '#damiansire10k since:2011-07-11', count: 100 }, function (err, data, response) {
    const allTweetsDto = data.statuses.map(tweet => tweetToDto(tweet));
    saveInDataBase(allTweetsDto)
})

function tweetToDto(tweet) {
    return {
        created_at: tweet.created_at,
        text: tweet.text,
        name: tweet.user.name,
        screen_name: tweet.user.screen_name,
        location: tweet.user.location,
        profile_img: tweet.user.profile_image_url_https,
    }
}

function saveInDataBase(allTweetsDto) {
    client.connect()
    Promise.all(allTweetsDto.map(tweet => saveTweetInDataBase(tweet))).finally(x => client.end());

}


function saveTweetInDataBase(tweet) {
    const insertQuery = 'INSERT INTO tweets (created_at, "text", user_name, screen_name, "location", profile_img) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [tweet.created_at, tweet.text, tweet.name, tweet.screen_name, tweet.location, tweet.profile_image_url_https]

    return client
        .query(insertQuery, values)
        .then(res => {
            console.log("Todo ok")

        })
        .catch(e => console.error(e.stack))

}