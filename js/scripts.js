/* global localStorage */

var selected_meals = JSON.parse(localStorage.getItem("obj"));
console.log(selected_meals);

function buildRecipes(){
    var numRows = selected_meals.length / 3;
    for(let i = 0; i < numRows; i++){
        var row = document.createElement("div");
        row.setAttribute("class", "d-flex");
        for(let j = 0; j < 3; j++){
            var index = (i * 3) + j;
            var meal = document.createElement("div");
            meal.setAttribute("class", "meal");
            var img = document.createElement("img");
            img.setAttribute("src", selected_meals[index].img);
            img.setAttribute("height", "200px");
            img.setAttribute("width", "200px");
            img.setAttribute("class", "meal-img");
            meal.appendChild(img);
            var name = document.createElement("p");
            name.setAttribute("class", "ellipsis");
            name.innerHTML=selected_meals[index].name;
            meal.append(name);
            row.appendChild(meal);
        }
        document.getElementById("selected-meals").appendChild(row);
    }
}

buildRecipes();