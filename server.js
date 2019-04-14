
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const jieba = require('./scripts/main.js');

const dict1 = require('./scripts/data/dictionary.js');
const dict2 = require('./scripts/data/dict_custom.js');

const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {result: null, error: null});
})

app.listen(process.env.PORT || 5000, function () { // for heroku tcp 80 is acceptable
  // console.log('tsaibrobetalnuts app listening on port 5000!')
})

app.post('/', function(req, res) {
    let origin = req.body.origin;
    
    origin = origin.replace(/\s+/g, ""); // remove blanks

    let reg = new RegExp(/[.,:;?!。，：；、？！]/g); // remove non words
    origin = origin.replace(reg, ''); // 
    console.log(origin);

    node_jieba_parsing([dict1, dict2], origin, function (result) {
        console.log(result.join(" "));
        res.json({result: result.join("..."), error: null})
        //res.render('index', {result: result.join("..."), error: null});
    });

})