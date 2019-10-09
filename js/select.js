var meals = [{
    "name":"Cheeseburger",
    "img":"burgerTest"
},{
    "name":"Pizza",
    "img":"pizzaTest"
},{
    "name":"Burrito",
    "img":"burritoTest"
},{
    "name":"Pizza",
    "img":"pizzaTest"
},{
    "name":"Burrito",
    "img":"burritoTest"
},{
    "name":"Cheeseburger",
    "img":"burgerTest"
},{
    "name":"Burrito",
    "img":"burritoTest"
},{
    "name":"Cheeseburger",
    "img":"burgerTest"
},{
    "name":"Pizza",
    "img":"pizzaTest"
}]

function select(id) {
    if (document.getElementById(id).classList.contains("selected")) {
        document.getElementById(id).classList.remove("selected");
    } else {
    document.getElementById(id).classList.add("selected");
    }
}

function fill(){
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
            innerDiv.setAttribute("class", "d-flex");
            var innerDivHtml = "<img src=\"";
            if(meals[j].img != ""){
                innerDivHtml += "images/" + meals[j].img + ".jpg";
            }
            else{
                innerDivHtml += "http://alumni.byu.edu/sites/all/themes/byu2016/sites/default/favicon.ico";
            }
            innerDivHtml += "\" height=\"100px\" class=\"meal-img\" />&nbsp;&nbsp;&nbsp;&nbsp;<div class=\"align-self-center\"><h4>" + meals[j].name + "</h4></div>";
            innerDiv.innerHTML = innerDivHtml;
            item.appendChild(innerDiv);
            column.appendChild(item);
        }
        document.getElementById("select-meal").appendChild(column);
    }
}

fill();

var selected_meals = new Array();

function submit() {
    var list_meals = document.getElementById("select-meal").getElementsByTagName("li");
    var filter_meals = Array.from(list_meals).filter(function(item) {
        if (item.classList.contains("selected")) {
            return true;
        } else {
            return false;
        }
    })
    
    for (var i = 0; i < filter_meals.length; i++) {
        var child1 = filter_meals[i].getElementsByTagName("div");
        var child2 = child1[0].getElementsByTagName("div");
        var child3 = child2[0].getElementsByTagName("h4");
        selected_meals[i] = child3[0].innerHTML;
    }
    
    console.log(selected_meals);
}