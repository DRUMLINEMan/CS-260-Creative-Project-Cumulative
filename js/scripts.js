/* global fetch */
/* global localStorage */

var selected_meals = JSON.parse(localStorage.getItem("selected_meals"));
console.log(selected_meals);

function buildRecipes() {
    var numRows = selected_meals.length / 3;
    for (let i = 0; i < numRows; i++) {
        var row = document.createElement("div");
        row.setAttribute("class", "d-flex");
        var end = 3;
        var emptySpaces = 0;
        if ((i * 3) + 3 > selected_meals.length) {
            end = selected_meals.length - (i * 3);
            emptySpaces = (i * 3) + 3 - selected_meals.length;
        }
        for (let j = 0; j < end; j++) {
            var index = (i * 3) + j;
            var meal = document.createElement("div");
            meal.setAttribute("class", "meal flex-1");
            var img = document.createElement("img");
            img.setAttribute("src", selected_meals[index].img);
            img.setAttribute("width", "200px");
            img.setAttribute("height", "200px");
            img.setAttribute("class", "meal-img-home center");
            meal.appendChild(img);
            var name = document.createElement("p");
            name.setAttribute("class", "text-center");
            name.innerHTML = selected_meals[index].name;
            meal.append(name);
            row.appendChild(meal);
        }
        for (let i = 0; i < emptySpaces; i++) {
            var emptySlot = document.createElement("div");
            emptySlot.setAttribute("class", "meal flex-1");
            row.appendChild(emptySlot);
        }
        document.getElementById("selected-meals").appendChild(row);
    }
}

 var ingredientsList = new Array();

 function populateShoppingList() {
     if (selected_meals.length == 0) {
         return;
     }
    //  for(let index = 0; index < selected_meals.length; index++){
    for(let index = 0; index < 1; index++){
         const url = "https://api.spoonacular.com/recipes/" + selected_meals[index].id + "/information?apiKey=6defd8977ec24ae9829533ab61cdc90a";
         fetch(url)
             .then(function(response) {
                 return response.json();
             }).then(function(json) {
                     console.log(json);
                     for (let i = 0; i < json.extendedIngredients.length; i++) {
                         ingredientsList[i] = { "name": json.extendedIngredients[i].name, "amount": json.extendedIngredients[i].measures.us.amount, "unit": json.extendedIngredients[i].measures.us.unitLong };
                     }
                     var list = document.createElement("div");
                     list.setAttribute("class", "flex-col");
                     for (let i = 0; i < json.extendedIngredients.length; i++) {
                         var itemSlot = document.createElement("div");
                         itemSlot.setAttribute("class", "flex-1 shopping-list-item");
                         var item = document.createElement("p");
                         item.innerHTML = ingredientsList[i].name + " - " + ingredientsList[i].amount + " " + ingredientsList[i].unit;
                         itemSlot.append(item);
                         list.appendChild(itemSlot);
                     }
                     document.getElementById("shopping-list").appendChild(list);
             });
     }
 }

buildRecipes();
populateShoppingList();
