const Twit = require('twit');
const fs = require("fs");

const {
    insertTweet
} = require("./bdtest")

const { twitterKeys } = require("./notocar/keys")


const blocklistNamesObj = JSON.parse(fs.readFileSync("blocklist.json"));
const blocklist = blocklistNamesObj.map(nameObs => nameObs.name);

try {
    // Paquete Twit

    const T = new Twit(twitterKeys);

    // Retwittear Tweets que contenga el Hashtag #css
    const stream = T.stream('statuses/filter', { track: '#damiansire10k' });
    console.log("Iniciado :D")

    // Registro errores en las solicitudes
    function responseCallback(err, data, response) {
        if (err) {
            console.log(err.message);
            console.log(err.allErrors);
        }
        else {
            console.log("Estamos ok :D")
        }
    }



    // Tareas
    stream.on('tweet', tweet => {
        console.log("Blocklist:")
        console.log(blocklist)
        if (!blocklist.includes(tweet.user.screen_name)) {
            // Retweet
            T.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);
            // Me Gusta
            T.post('favorites/create', { id: tweet.id_str }, responseCallback);
            console.log(tweet.user.name);
            console.log(tweet.user.location);
            insertTweet(tweet.user.screen_name, tweet.text)
            //T.post('statuses/update', { status: `Gracias por tu tweet @${tweet.user.screen_name} lo aprecio mucho!!!` }, responseCallback)
        }
        else {
            console.log(`Bloqueado: ${tweet.user.screen_name} ${tweet.text}`)
        }
    });

} catch (error) {
    console.log("Exploto :)")
}
