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
    tweetList.forEach(tweet => {
        insertTable(tweet.usuario, tweet.tweet);
    });
}

fetch(endpoint).then(response => response.json()).then(tweetList => renderTweets(tweetList))
