/* global fetch */

function search(){
    var keyword = document.getElementById("keyword").value;
    const url = "https://api.spoonacular.com/recipes/search?query=" + keyword + "&number=9&apiKey=6defd8977ec24ae9829533ab61cdc90a";
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
        });
}