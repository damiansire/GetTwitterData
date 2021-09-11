const { twitterKeys } = require("./notocar/keys")

// Paquete Twit
const Twit = require('twit');

const T = new Twit({
    consumer_key: "TU CONSUMER KEY", // Se Generó cuando creamos la API en Twitter Developers
    consumer_secret: "TU CONSUMER SECRET", // Se Generó cuando creamos la API en Twitter Developers
    access_token: "TU ACCESS TOKEN", // Se Generó cuando creamos la API en Twitter Developers
    access_token_secret: "TU ACCESS TOKEN SECRET", // Se Generó cuando creamos la API en Twitter Developers
    timeout_ms: 60 * 20000, // Ejecutar tarea cada 20 segundos
    strictSSL: true, // Le indico que trabaje los procesos con SSL (Secure Sockets Layer o Capa de Sockets Seguros)
});

// Retwittear Tweets que contenga el Hashtag #css
const stream = T.stream('statuses/filter', { track: '#css' });

// Registro errores en las solicitudes
function responseCallback(err, data, response) {
    console.log(err);
}

// Tareas
stream.on('tweet', tweet => {
    // Retweet
    T.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);
    // Me Gusta
    T.post('favorites/create', { id: tweet.id_str }, responseCallback);
});
