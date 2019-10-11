/* global fetch */
/* global localStorage */

var meals = new Array();

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
    var db_meals = JSON.parse(localStorage.getItem("meal-db"));
    console.log(db_meals);
    meals = new Array();
    for(let i = 0; i < db_meals.length; i++){
        meals[i] = {"name":db_meals[i].name, "img":db_meals[i].img, "id":db_meals[i].id};
    }
    console.log(meals.length);
    var eachCol = Math.floor(meals.length / 3);
    var end = 0;
    for(let i = 0; i < 3; i++){
        var column = document.createElement("div");
        column.setAttribute("class", "flex-md-fill");
        var list = document.createElement("ul");
        end = i + (3 * eachCol) + 1;
        if(meals.length < end){
            end = meals.length - (meals.length % 3);
        }
        for(let j = i; j < end; j += 3){
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

function clearMeals(){
    localStorage.removeItem("meal-db");
    meals = new Array();
    window.location.href = "select.html";
}