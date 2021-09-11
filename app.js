const { twitterKeys } = require("./notocar/keys")

const blocklist = ["damiansire"]

try {
    // Paquete Twit
    const Twit = require('twit');
    const T = new Twit(twitterKeys);

    // Retwittear Tweets que contenga el Hashtag #css
    const stream = T.stream('statuses/filter', { track: '#damiansire10k' });
    console.log("Iniciado :D")

    // Registro errores en las solicitudes
    function responseCallback(err, data, response) {
        if (err) {
            console.log(err.message);
            console.log(err.allErrors);
            return;
        }
        console.log("Tamos ok bb")
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
            console.log(tweet.text);
            console.log(tweet.user.name);
            console.log(tweet.user.screen_name);
            console.log(tweet.user.location);
        }
        else {
            console.log(`Bloqueado: ${tweet.user.screen_name} ${tweet.text}`)
        }
    });

} catch (error) {
    console.log("Exploto :)")
}
