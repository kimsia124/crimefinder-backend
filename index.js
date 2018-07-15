var express = require('express');
var app = express();
var mysql  = require('mysql');
var cors = require('cors');
var fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    
    extended: true
}));

app.use(cors());

var connection = mysql.createConnection({
    host : '',
    user : '',
    password : '',
    database : ''
});


app.listen(8080, function() {
    console.log('CRIMEFINDER');
});


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/map.html');
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

app.get('/flagApprove', function(req, res) {
    let id  = req.query.id;
	id = String(id);
	
	let SQL = "UPDATE crime SET flag = '1' WHERE id = " + id + ";";
    connection.query(SQL, function(error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
})

app.get('/flagCancel', function(req, res) {
	let id  = req.query.id;
	id = String(id);
	
	let SQL = "UPDATE crime SET flag = '0' WHERE id = " + id + ";";
    connection.query(SQL, function(error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
})

app.get('/img/:id', function(req, res){
	fs.readFile('./img/kind'+req.params.id+'.png', function(error, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(data);
	})
})

app.get('/pin/:id', function(req, res){
	fs.readFile('./img/pin'+req.params.id+'.png', function(error, data) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.end(data);
	})
})
