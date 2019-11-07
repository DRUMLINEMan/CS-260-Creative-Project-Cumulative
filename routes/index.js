var express = require('express');
var cors = require('cors');
const allowedAddresses = {
    origin: 'http://www.cs260nc.com'
};
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', { root: 'CS-260-Creative-Project-Cumulative' });
});

router.get('/getMeals', cors(allowedAddresses), function(req, res, next) {
    console.log("In getMeals route");
    const url = "https://api.spoonacular.com/recipes/search?query=" + req.query.keyword + "&number=9&apiKey=6defd8977ec24ae9829533ab61cdc90a";
    request(url).pipe(res);
});

router.get('/getIngredients', cors(allowedAddresses), function(req, res, next) {
    console.log("In getIngredients route");
    const url = "https://api.spoonacular.com/recipes/" + req.query.id + "/information?apiKey=6defd8977ec24ae9829533ab61cdc90a";
    request(url).pipe(res);
});

module.exports = router;
