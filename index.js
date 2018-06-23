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
    password : 'dbdbdib',
    database : 'crimefinder'
});


app.listen(8080, function() {
    console.log('Server is listening on port 8080!안녕');
});


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/inputCrime', function(req, res){
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


app.get('/getCrime', function(req, res) {
    let type  = req.query.type;
	type = String(type);
	
    let SQL = "SELECT * FROM crime WHERE flag = 1 AND type ='" + type + "';";
    connection.query(SQL, function(error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
});

app.get('/adminView', function(req, res) {
    let SQL = "SELECT * FROM crime;";
    connection.query(SQL, function(error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
});

app.put('/flagApprove', function(req, res) {
	let id = req.body.id;
	
	let SQL = "UPDATE crime SET flag = '1' WHERE id = " + id + ";";
    connection.query(SQL, function(error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
})

app.put('/flagCancel', function(req, res) {
	let id = req.body.id;
	
	let SQL = "UPDATE crime SET flag = '0' WHERE id = " + id + ";";
    connection.query(SQL, function(error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
})
