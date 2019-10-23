/* global fetch */
/* global localStorage */

var meals = new Array();

function search(){
    var keyword = document.getElementById("keyword").value;
    const url = "https://api.spoonacular.com/recipes/search?query=" + keyword + "&number=9&apiKey=6defd8977ec24ae9829533ab61cdc90a";
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json);
            document.getElementById("search-results").innerHTML="";
            for(let i = 0; i < json.results.length; i++){
                meals[i] = {"name":json.results[i].title, "img":json.baseUri + json.results[i].image, "id":json.results[i].id};
            }
            var eachCol = meals.length / 3;
            var end = 0;
            for(let i = 0; i < 3; i++){
                var column = document.createElement("div");
                column.setAttribute("class", "flex-md-fill");
                var list = document.createElement("ul");
                end += eachCol;
                if(list.length < end){
                    end = list.length;
                }
                for(let j = i * eachCol; j < end; j++){
                    var item = document.createElement("li");
                    item.setAttribute("class", "select-meal-item");
                    item.setAttribute("id", j);
                    item.setAttribute("onclick", "select(" + j + ")");
                    var innerDiv = document.createElement("div");
                    innerDiv.setAttribute("class", "row");
                    var imgDiv = document.createElement("div");
                    imgDiv.setAttribute("class", "col");
                    var innerImg = document.createElement("img");
                    if(meals[j].img != ""){
                        innerImg.setAttribute("src", meals[j].img);
                    }
                    innerImg.setAttribute("height", "100px;");
                    innerImg.setAttribute("width", "100px;");
                    innerImg.setAttribute("class", "meal-img");
                    imgDiv.appendChild(innerImg);
                    var titleDiv = document.createElement("div");
                    titleDiv.setAttribute("class", "col");
                    titleDiv.setAttribute("style", "margin:auto; margin-right:10px;");
                    var title = document.createElement("h5");
                    title.setAttribute("class", "select-ellipsis");
                    title.innerHTML = meals[j].name;
                    titleDiv.appendChild(title);
                    innerDiv.appendChild(imgDiv);
                    innerDiv.appendChild(titleDiv);
                    item.appendChild(innerDiv);
                    column.appendChild(item);
                }
                document.getElementById("search-results").appendChild(column);
            }
            document.getElementById("addButton").classList.remove("hidden");
        });
}

function select(id) {
    if (document.getElementById(id).classList.contains("selected")) {
        document.getElementById(id).classList.remove("selected");
        meals[id].selected="false";
    } else {
        document.getElementById(id).classList.add("selected");
        meals[id].selected="true";
    }
}

function add(){
    var selected_meals = new Array();
    var filter_meals = Array.from(meals).filter(function(item) {
        if (item.selected === "true") {
            return true;
        } else {
            return false;
        }
    });
    
    for (var i = 0; i < filter_meals.length; i++) {
        selected_meals[i] = {"name":filter_meals[i].name, "id":filter_meals[i].id, "img":filter_meals[i].img};
    }
    
    var db_meals = JSON.parse(localStorage.getItem("meal-db"));
    if(db_meals !== null){
        for(let i = 0; i < db_meals.length; i++){
            var found = false;
            console.log(selected_meals.length);
            for(let j = 0; j < selected_meals.length; j++){
                if(selected_meals[j].id == db_meals[i].id){
                    found = true;
                }
            }
            if(!found){
                selected_meals[i + filter_meals.length] = {"name":db_meals[i].name, "id":db_meals[i].id, "img":db_meals[i].img};
            }
        }
    }
    
    localStorage.setItem("meal-db", JSON.stringify(selected_meals));
    
    console.log(JSON.parse(localStorage.getItem("meal-db")));
}