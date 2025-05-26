var express = require('express');
var things = require('./things.js');

var app = express();

app.get('/', function(req, res){
   res.send("Hello!");
});

app.get('/hello', function(req, res){
   res.send("Hello World!");
});

app.post('/hello', function(req, res){
   res.send("You just called the post method at '/hello'!\n");
});
app.use('/things', things);

app.listen(3000);