/* global localStorage */
/* global Vue */
/* global axios */

let app = new Vue({
    el: '#mainPageDisplay',
    data: {
        selectedMeals: [],
        mealRows: [],
        shoppingList: [],
        mealsAreSelected: false
    },
    created() {
        this.loadPageDisplay();
    },
    methods: {
        loadPageDisplay() {
            this.selectedMeals = JSON.parse(localStorage.getItem("selected_meals"));
            this.mealRows = [];
            this.shoppingList = [];
            if (this.selectedMeals.length > 0) {
                this.mealsAreSelected = true;
                this.loadMeals();
                this.loadShoppingList();
            }
            else {
                this.mealsAreSelected = false;
            }
            console.log(this.mealRows);
            console.log(this.shoppingList);
        },
        loadMeals() {
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
        async loadShoppingList() {
            const url = "https://api.spoonacular.com/recipes/" + this.selectedMeals[0].id + "/information?apiKey=6defd8977ec24ae9829533ab61cdc90a";
            const response = await axios.get(url);
            for (let ii = 0; ii < response.data.extendedIngredients.length; ii++) {
                this.shoppingList.push({ name: response.data.extendedIngredients[ii].name, amount: response.data.extendedIngredients[ii].measures.us.amount, unit: response.data.extendedIngredients[ii].measures.us.unitLong });
            }
        }
    }
});
