var bodyParser = require('body-parser');
var express = require('express');
var mysql  = require('mysql');
var http = require('https');
var cors = require('cors');
var fs = require('fs');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({

    extended: true
}));

app.use(cors());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'crimefinder'
});


app.listen(8080, function () {
    console.log('CRIMEFINDER');
});

app.connect(function (err) {
    if (err) {
        console.error('error connecting' + err.stack);
        return;
    }
    connection.end();
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/map.html');
});

app.get('/admin', function (req, res) {
    res.sendFile(__dirname + '/adminLogin.html');
});

app.get('/adminMain', function (req, res) {
    res.sendFile(__dirname + '/admin.html');
});

app.post('/inputCrime', function (req, res) {
    let lat = req.body.lat;
    let lng = req.body.lng;
    let author = req.body.author;
    let content = req.body.content;
    let type = req.body.type;


    let SQL = "INSERT INTO crime(lat, lng, author, content, type) VALUE ('" + lat + "','" + lng + "','" + author + "','" + content + "','" + type + "')";
    console.log(SQL);
    connection.query(SQL, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
})


app.get('/getCrime', function (req, res) {
    let type = req.query.type;
    type = String(type);

    let SQL = "SELECT * FROM crime WHERE flag = 1 AND type ='" + type + "';";
    console.log(SQL);
    connection.query(SQL, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
});

app.get('/adminView', function (req, res) {
    let SQL = "SELECT * FROM crime;";
    connection.query(SQL, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
});

app.get('/flagApprove', function (req, res) {
    let id = req.query.id;
    id = String(id);

    let SQL = "UPDATE crime SET flag = '1' WHERE id = " + id + ";";
    console.log(SQL);
    connection.query(SQL, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
})

app.get('/flagCancel', function (req, res) {
    let id = req.query.id;
    id = String(id);

    let SQL = "UPDATE crime SET flag = '0' WHERE id = " + id + ";";
    console.log(SQL);
    connection.query(SQL, function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    })
})

app.get('/img/:id', function (req, res) {
    fs.readFile('./img/kind' + req.params.id + '.png', function (error, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(data);
    })
})

app.get('/pin/:id', function (req, res) {
    fs.readFile('./img/pin' + req.params.id + '.png', function (error, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(data);
    })
})

//네이버 API 사용 함수

var client_id = "edUeHZ4NHcXexnbTzU2M";
var client_secret = "gcMl18oSDs";

app.get('/newsSearch', function(req, res){
    res.sendFile(__dirname + '/newsSearch.html');
});

app.get('/search', function (req, res) {

    var api_url = 'https://openapi.naver.com/v1/search/news?query=' + encodeURI(req.query.query); // json 결과
    //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
    var request = require('request');
    var options = {
        url: api_url,
        headers: {
            'X-Naver-Client-Id': client_id,
            'X-Naver-Client-Secret': client_secret
        }
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {
                'Content-Type': 'text/json;charset=utf-8'
            });
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
})

app.listen(8080);
