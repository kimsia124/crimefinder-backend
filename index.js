var express = require('express');
var app = express();
var mysql  = require('mysql');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    
    extended: true
}));

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1234',
    database : 'crimefinder'
});


app.listen(8080, function() {
    console.log('Server is listening on port 8080!안녕');
});


app.connect(function(err){
  if(err){
    console.error('error connecting'+err.stack);
    return;
  }
  connection.end();
});


app.post('/crime', function(req, res){
    let lat= req.body.lat;
    let lng = req.body.lng;
    let author = req.body.author;
    let content = req.body.content;
    let type = req.body.type;
    
    let SQL = "INSERT INTO crime(lat, lng, author, content, type) VALUE ('" + lat + "','" + lng + "','" + author + "','" + content + "','" + type + "')";
    connection.query(SQL, function(error, results, fields) {
		if (error) throw error;
		res.send(results)
    })
})


app.get('/data/crime', function(req, res) {
    let SQL = "SELECT * FROM crime WHERE flag = 1";
    connection.query(SQL, function(error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
});

app.put('/flag/approve', function(req, res) {
	let id = req.body.id;
	
	let SQL = "UPDATE crime SET flag = '1' WHERE id = " + id + ";";
    connection.query(SQL, function(error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
})

app.put('/flag/cancel', function(req, res) {
	let id = req.body.id;
	
	let SQL = "UPDATE crime SET flag = '0' WHERE id = " + id + ";";
    connection.query(SQL, function(error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
})
