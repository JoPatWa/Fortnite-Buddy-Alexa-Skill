var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');
var uri = 'https://api.fortnitetracker.com/v1/profile/{platform}/{epic-nickname}';
var key = '2f3b2a70-692e-4e0e-a1e5-041448da399b';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'static')));


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

var uri = 'https://api.fortnitetracker.com/v1/profile/';
// https://api.fortnitetracker.com/v1/profile/{platform}/{epic-nickname}
// pc, xbl, psn 
// TRN-Api-Key: a768e120-a23b-4880-a2a3-fdbdda42c52a
app.post('/',function(req,res){
 
    request.get(uri + req.body.dropDownValue + '/' + req.body.epicNickName,{
        headers : {
            'TRN-Api-Key': '2f3b2a70-692e-4e0e-a1e5-041448da399b'
        }},function(error,response,body){
            res.json(body);
        });
});

var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listenting on Port 3000'));