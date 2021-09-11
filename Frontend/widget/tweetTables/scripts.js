let allTweets = [];

const endpoint = "http://localhost:3005/api/v1/tweets";

const tableRef = document.getElementById("tweetTable");

function insertTable(name, tweet) {
    const newRow = tableRef.insertRow(-1);

    // Inserta una celda en la fila, en el índice 0
    const nameCell = newRow.insertCell(0);
    const nameText = document.createTextNode(name);
    nameCell.appendChild(nameText);

    const tweetCell = newRow.insertCell(1);
    const tweetText = document.createTextNode(tweet);
    tweetCell.appendChild(tweetText);


}

function renderTweets(tweetList) {
    document.getElementById("tweetTbody").innerHTML = "";
    tweetList.forEach(tweet => {
        insertTable(tweet.usuario, tweet.tweet);
    });
}

function RefreshData() {
    fetch(endpoint).then(response => response.json()).then(tweetList => {

        if (tweetList.length > allTweets.length) {
            allTweets = tweetList;
            console.log("Nueva data")
            renderTweets(tweetList)
        }
        else {
            console.log("No fue necesario")
        }
        setTimeout(RefreshData, 10000)
    })
}

RefreshData();