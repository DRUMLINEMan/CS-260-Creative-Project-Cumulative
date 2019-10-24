/* global fetch */
/* global localStorage */
/* global Vue */
/* global axios */

// var selected_meals = JSON.parse(localStorage.getItem("selected_meals"));
// console.log(selected_meals);

// function buildRecipes() {
//     var numRows = selected_meals.length / 3;
//     for (let i = 0; i < numRows; i++) {
//         var row = document.createElement("div");
//         row.setAttribute("class", "d-flex");
//         var end = 3;
//         var emptySpaces = 0;
//         if ((i * 3) + 3 > selected_meals.length) {
//             end = selected_meals.length - (i * 3);
//             emptySpaces = (i * 3) + 3 - selected_meals.length;
//         }
//         for (let j = 0; j < end; j++) {
//             var index = (i * 3) + j;
//             var meal = document.createElement("div");
//             meal.setAttribute("class", "meal flex-1");
//             var img = document.createElement("img");
//             img.setAttribute("src", selected_meals[index].img);
//             img.setAttribute("width", "200px");
//             img.setAttribute("height", "200px");
//             img.setAttribute("class", "meal-img-home center");
//             meal.appendChild(img);
//             var name = document.createElement("p");
//             name.setAttribute("class", "text-center");
//             name.innerHTML = selected_meals[index].name;
//             meal.append(name);
//             row.appendChild(meal);
//         }
//         for (let i = 0; i < emptySpaces; i++) {
//             var emptySlot = document.createElement("div");
//             emptySlot.setAttribute("class", "meal flex-1");
//             row.appendChild(emptySlot);
//         }
//         document.getElementById("selected-meals").appendChild(row);
//     }
// }

// var ingredientsList = new Array();

// function populateShoppingList() {
//     if (selected_meals.length == 0) {
//         return;
//     }
//     //  for(let index = 0; index < selected_meals.length; index++){
//     for (let index = 0; index < 1; index++) {
//         const url = "https://api.spoonacular.com/recipes/" + selected_meals[index].id + "/information?apiKey=6defd8977ec24ae9829533ab61cdc90a";
//         fetch(url)
//             .then(function(response) {
//                 return response.json();
//             }).then(function(json) {
//                 console.log(json);
//                 for (let i = 0; i < json.extendedIngredients.length; i++) {
//                     ingredientsList[i] = { "name": json.extendedIngredients[i].name, "amount": json.extendedIngredients[i].measures.us.amount, "unit": json.extendedIngredients[i].measures.us.unitLong };
//                 }
//                 var list = document.createElement("div");
//                 list.setAttribute("class", "flex-col");
//                 for (let i = 0; i < json.extendedIngredients.length; i++) {
//                     var itemSlot = document.createElement("div");
//                     itemSlot.setAttribute("class", "flex-1 shopping-list-item");
//                     var item = document.createElement("p");
//                     item.innerHTML = ingredientsList[i].name + " - " + ingredientsList[i].amount + " " + ingredientsList[i].unit;
//                     itemSlot.append(item);
//                     list.appendChild(itemSlot);
//                 }
//                 document.getElementById("shopping-list").appendChild(list);
//             });
//     }
// }

// buildRecipes();
// populateShoppingList();



let mainPageDisplay = new Vue({
    el: '#mainPageDisplay',
    data: {
        selectedMeals: [],
        mealRows: [],
        shoppingList: [],
        mealsAreSelected: false
    },
    created() {
        this.loadMeals();
    },
    methods: {
        loadMeals() {
            this.selectedMeals = JSON.parse(localStorage.getItem("selected_meals"));
            this.mealRows = [];
            if (this.selectedMeals.length > 0) {
                this.mealsAreSelected = true;
                this.loadMealRows();
                this.loadShoppingList();
            }
            else {
                this.mealsAreSelected = false;
            }
            console.log(this.mealRows);
        },
        loadMealRows() {
            let numRows = Math.ceil(this.selectedMeals.length / 3);
            let curMealNum = 0;
            for (let ii = 0; ii < numRows; ii++) {
                let curMealRow = [];
                for (let lastMealInRow = curMealNum + 3; curMealNum < lastMealInRow; curMealNum++) {
                    if (curMealNum in this.selectedMeals) {
                        curMealRow.push({
                            img: this.selectedMeals[curMealNum].img,
                            name: this.selectedMeals[curMealNum].name
                        });
                    }
                }
                this.mealRows.push(curMealRow);
            }
        },
        loadShoppingList() {
            // Clone of mealRows function above modify for shopping list and put in handling in the index.html
            
            // let numRows = Math.ceil(this.selectedMeals.length / 3);
            // let curMealNum = 0;
            // for (let ii = 0; ii < numRows; ii++) {
            //     let curMealRow = [];
            //     for (let lastMealInRow = curMealNum + 3; curMealNum < lastMealInRow; curMealNum++) {
            //         if (curMealNum in this.selectedMeals) {
            //             curMealRow.push({
            //                 img: this.selectedMeals[curMealNum].img,
            //                 name: this.selectedMeals[curMealNum].name
            //             });
            //         }
            //     }
            //     this.mealRows.push(curMealRow);
            // }
        }
    },
    computed: {
        month() {
            var month = new Array;
            if (this.current.month === undefined)
                return '';
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";
            return month[this.current.month - 1];
        }
    },
    watch: {
        number(value, oldvalue) {
            if (oldvalue === '') {
                this.max = value;
            }
            else {
                this.xkcd();
            }
        },
    }
});
