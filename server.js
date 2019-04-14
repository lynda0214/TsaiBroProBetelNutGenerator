
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

app.listen(80, function () { // for heroku tcp 80 is acceptable
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

// app.post('/', function (req, res) {
    
//     let origin = req.body.origin;
//     console.log(origin);

//     request(origin, function (err, response) {
//       if(err){
//         console.log(err);
//         res.render('index', {result: null, error: 'Error, please try again'});
//       } else {
//         ckip.getSentences(response, function (err, sentences) {
//             if (err) throw err;
//             res.render('index', {result:sentences, error: null});
//             console.log(sentences);  // [ '　台新(N)　金控(N)　12月(N)　3日(N)　將(ADV)　召開(Vt)
//                                     // 　股東(N)　臨時會(N)　進行(Vt)　董監(N)　改選(Nv)　。(PERIODCATEGORY)' ]
//           });
//       }
//     });



//   })