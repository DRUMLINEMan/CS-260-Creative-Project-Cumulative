/* global fetch */
/* global localStorage */

var meals = [{
    "name":"Cheeseburger",
    "img":"burgerTest",
    "id":"0",
    "selected":"false"
},{
    "name":"Pizza",
    "img":"pizzaTest",
    "id":"0",
    "selected":"false"
},{
    "name":"Burrito",
    "img":"burritoTest",
    "id":"0",
    "selected":"false"
},{
    "name":"Pizza",
    "img":"pizzaTest",
    "id":"0",
    "selected":"false"
},{
    "name":"Burrito",
    "img":"burritoTest",
    "id":"0",
    "selected":"false"
},{
    "name":"Cheeseburger",
    "img":"burgerTest",
    "id":"0",
    "selected":"false"
},{
    "name":"Burrito",
    "img":"burritoTest",
    "id":"0",
    "selected":"false"
},{
    "name":"Cheeseburger",
    "img":"burgerTest",
    "id":"0",
    "selected":"false"
},{
    "name":"Pizza",
    "img":"pizzaTest",
    "id":"0",
    "selected":"false"
}]

function select(id) {
    if (document.getElementById(id).classList.contains("selected")) {
        document.getElementById(id).classList.remove("selected");
        meals[id].selected="false";
    } else {
        document.getElementById(id).classList.add("selected");
        meals[id].selected="true";
    }
}

function fill(){
    const url = "https://api.spoonacular.com/recipes/search?query=pineapple&number=" + meals.length + "&apiKey=6defd8977ec24ae9829533ab61cdc90a";
      fetch(url)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
            for(let i = 0; i < json.results.length; i++){
                meals[i].name = json.results[i].title;
                meals[i].img = json.baseUri + json.results[i].image;
                meals[i].id = json.results[i].id;
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
                document.getElementById("select-meal").appendChild(column);
            }
        });
}

fill();

var selected_meals = new Array();

function submit() {
    selected_meals = new Array();
    var list_meals = document.getElementById("select-meal").getElementsByTagName("li");
    var filter_meals = Array.from(meals).filter(function(item) {
        if (item.selected === "true") {
            return true;
        } else {
            return false;
        }
    })
    
    for (var i = 0; i < filter_meals.length; i++) {
        selected_meals[i] = {"name":filter_meals[i].name, "id":filter_meals[i].id, "img":filter_meals[i].img};
    }
    console.log(meals);
    console.log(selected_meals);
    localStorage.setItem("selected_meals", JSON.stringify(selected_meals));
    redirectHome();
}

function redirectHome(){
    window.location.href = "index.html";
}