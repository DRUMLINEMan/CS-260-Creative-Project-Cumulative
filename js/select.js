/* global localStorage */
/* global Vue */

let app = new Vue({
    el: '#container',
    data: {
        meals: new Array(),
        selected_meals: new Array(),
    },
    created() {
        this.fill();
    },
    methods: {
        select: function(id) {
            if (document.getElementById(id).classList.contains("selected")) {
                document.getElementById(id).classList.remove("selected");
                this.meals[id].selected="false";
            } else {
                document.getElementById(id).classList.add("selected");
                this.meals[id].selected="true";
            }
        },
        fill: function(){
            this.meals = new Array();
            this.meals[0] = new Array();
            this.meals[1] = new Array();
            this.meals[2] = new Array();
            var db_meals = JSON.parse(localStorage.getItem("mealDb"));
            for(let i = 0; i < db_meals.length; i += 3){
                this.meals[0][i / 3] = {"name":db_meals[i].name, "img":db_meals[i].img, "id":db_meals[i].id};
                if(i + 1 < db_meals.length){
                    this.meals[1][i / 3] = {"name":db_meals[i + 1].name, "img":db_meals[i + 1].img, "id":db_meals[i + 1].id};
                }
                if(i + 2 < db_meals.length){
                    this.meals[2][i / 3] = {"name":db_meals[i + 2].name, "img":db_meals[i + 2].img, "id":db_meals[i + 2].id};
                }
            }
        },
        submit: function(){
            this.selected_meals = new Array();
            var list_meals = document.getElementById("selectMeal").getElementsByTagName("li");
            var filter_meals = Array.from(this.meals).filter(function(item) {
                if (item.selected === "true") {
                    return true;
                } else {
                    return false;
                }
            })
            
            for (var i = 0; i < filter_meals.length; i++) {
                this.selected_meals[i] = {"name":filter_meals[i].name, "id":filter_meals[i].id, "img":filter_meals[i].img};
            }
            localStorage.setItem("selected_meals", JSON.stringify(this.selected_meals));
            this.redirectHome();
        },
        redirectHome: function(){
            window.location.href = "index.html";
        },
        clearMeals: function(){
            localStorage.removeItem("mealDb");
            this.meals = new Array();
            window.location.href = "select.html";
        },
        index: function(i, j){
            var result = (((j - 1) * 3) + (i - 1));
            console.log("i: " + i + ", j: " + j + ", J-Index: " + result);
            return result;
        },
    },
});





// var meals = new Array();

// function select(id) {
//     if (document.getElementById(id).classList.contains("selected")) {
//         document.getElementById(id).classList.remove("selected");
//         meals[id].selected="false";
//     } else {
//         document.getElementById(id).classList.add("selected");
//         meals[id].selected="true";
//     }
// }

// function fill(){
//     var db_meals = JSON.parse(localStorage.getItem("meal-db"));
//     console.log(db_meals);
//     meals = new Array();
//     for(let i = 0; i < db_meals.length; i++){
//         meals[i] = {"name":db_meals[i].name, "img":db_meals[i].img, "id":db_meals[i].id};
//     }
//     console.log(meals.length);
//     var eachCol = Math.floor(meals.length / 3);
//     var end = 0;
//     for(let i = 0; i < 3; i++){
//         var column = document.createElement("div");
//         column.setAttribute("class", "flex-md-fill");
//         var list = document.createElement("ul");
//         end = i + (3 * eachCol) + 1;
//         if(meals.length < end){
//             end = meals.length - (meals.length % 3);
//         }
//         for(let j = i; j < end; j += 3){
//             var item = document.createElement("li");
//             item.setAttribute("class", "select-meal-item");
//             item.setAttribute("id", j);
//             item.setAttribute("onclick", "select(" + j + ")");
//             var innerDiv = document.createElement("div");
//             innerDiv.setAttribute("class", "row");
//             var imgDiv = document.createElement("div");
//             imgDiv.setAttribute("class", "col");
//             var innerImg = document.createElement("img");
//             if(meals[j].img != ""){
//                 innerImg.setAttribute("src", meals[j].img);
//             }
//             innerImg.setAttribute("height", "100px;");
//             innerImg.setAttribute("width", "100px;");
//             innerImg.setAttribute("class", "meal-img");
//             imgDiv.appendChild(innerImg);
//             var titleDiv = document.createElement("div");
//             titleDiv.setAttribute("class", "col");
//             titleDiv.setAttribute("style", "margin:auto; margin-right:10px;");
//             var title = document.createElement("h5");
//             title.setAttribute("class", "select-ellipsis");
//             title.innerHTML = meals[j].name;
//             titleDiv.appendChild(title);
//             innerDiv.appendChild(imgDiv);
//             innerDiv.appendChild(titleDiv);
//             item.appendChild(innerDiv);
//             column.appendChild(item);
//         }
//         document.getElementById("select-meal").appendChild(column);
//     }
// }

// fill();

// var selected_meals = new Array();

// function submit() {
//     selected_meals = new Array();
//     var list_meals = document.getElementById("select-meal").getElementsByTagName("li");
//     var filter_meals = Array.from(meals).filter(function(item) {
//         if (item.selected === "true") {
//             return true;
//         } else {
//             return false;
//         }
//     })
    
//     for (var i = 0; i < filter_meals.length; i++) {
//         selected_meals[i] = {"name":filter_meals[i].name, "id":filter_meals[i].id, "img":filter_meals[i].img};
//     }
//     console.log(meals);
//     console.log(selected_meals);
//     localStorage.setItem("selected_meals", JSON.stringify(selected_meals));
//     redirectHome();
// }

// function redirectHome(){
//     window.location.href = "index.html";
// }

// function clearMeals(){
//     localStorage.removeItem("meal-db");
//     meals = new Array();
//     window.location.href = "select.html";
// }