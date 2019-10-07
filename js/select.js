var meals = [{
    "name":"Meal 1",
    "img":""
},{
    "name":"Meal 2",
    "img":""
},{
    "name":"Meal 3",
    "img":""
},{
    "name":"Meal 4",
    "img":""
},{
    "name":"Meal 5",
    "img":""
},{
    "name":"Meal 6",
    "img":""
},{
    "name":"Meal 7",
    "img":""
},{
    "name":"Meal 8",
    "img":""
},{
    "name":"Meal 9",
    "img":""
}]

function select(id) {
    document.getElementById(id).classList.add("selected");
    for(let i = 0; i < meals.length; i++){
        if(i != id){
            document.getElementById(i).classList.remove("selected");
        }
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
        for(let j = i * 3; j < end; j++){
            var item = document.createElement("li");
            item.setAttribute("class", "select-meal-item");
            item.setAttribute("id", j);
            item.setAttribute("onclick", "select(" + j + ")");
            var innerDiv = document.createElement("div");
            innerDiv.setAttribute("class", "d-flex");
            var innerDivHtml = "<img src=\"";
            if(meals[j].img != ""){
                innerDivHtml += meals[j].img;
            }
            else{
                innerDivHtml += "http://alumni.byu.edu/sites/all/themes/byu2016/sites/default/favicon.ico";
            }
            innerDivHtml += "\" height=\"100px\" />&nbsp;&nbsp;&nbsp;&nbsp;<div class=\"align-self-center\"><h4>" + meals[j.name] + "</h4></div>";
            innerDiv.innerHTML = innerDivHtml;
            item.appendChild(innerDiv);
            column.appendChild(item);
        }
        document.getElementById("select-meal").appendChild(column);
    }
}

fill();