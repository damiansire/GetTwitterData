const {
    selectTweets,
    selectCountsByUsers
} = require("../bdtest")


exports.getAllTweets = async (req, res) => {
    const tweetList = await selectTweets();
    res.send(JSON.stringify(tweetList));
};


exports.getCountsByUsers = async (req, res) => {
    const tweetList = await selectCountsByUsers();
    res.send(JSON.stringify(tweetList));
};