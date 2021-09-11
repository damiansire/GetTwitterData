const {
    selectTweets
} = require("../bdtest")


exports.getAllTweets = async (req, res) => {
    const tweetList = await selectTweets();
    res.send(JSON.stringify(tweetList));
};