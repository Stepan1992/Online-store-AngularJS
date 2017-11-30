const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql');



const dotenv = require('dotenv').config({
    silent: process.env.NODE_ENV === 'production',
    path: __dirname + '/.env'
});

const port = process.env.PORT || 8000;



const fs = require('fs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));
app.use(cors());


//MYSQL
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


let initDb = function () {
    connection.query('' +
        'CREATE TABLE IF NOT EXISTS shop_users (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'login varchar(50), ' +
        'email varchar(50),' +
        'password varchar(50),' +
        'status varchar(50),' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;

        });

    connection.query('' +
        'CREATE TABLE IF NOT EXISTS chating (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'question varchar(150), ' +
        'user varchar(50),' +
        'date varchar(50),' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;
        });

    connection.query('' +
        'CREATE TABLE IF NOT EXISTS goods (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'pictureSrc varchar(250),' +
        'name varchar(50), ' +
        'price int(11),' +
        'category varchar(50),' +
        'description varchar(100),' +
        'count int(11),' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;
        });

    connection.query('' +
        'CREATE TABLE IF NOT EXISTS reviews (' +
        'id int(11) NOT NULL AUTO_INCREMENT,' +
        'question varchar(50), ' +
        'user varchar(50),' +
        'date varchar(50),' +
        'goodsname varchar(50),' +
        'PRIMARY KEY(id) )',
        function (err) {
            if (err) throw err;
        });

};

initDb();


app.get('/login', function (req, res) {
    let sql = "SELECT * FROM shop_users WHERE login = '" + req.query.login + "' AND password = '" + req.query.pass + "'";
    connection.query(sql, function (err, responce) {
        if (err) throw err;
        res.status(200).send(responce);
    });
});

app.post('/login', function (req, res) {
    connection.query('INSERT INTO shop_users SET ?', req.body,
        function (err, result) {
            if (err) throw err;
        }
    );
    res.sendStatus(200);
});


//chating


app.get('/chating', function (req, res) {
    connection.query('SELECT * FROM chating', function (err, responce) {
        if (err) throw err;
        res.status(200).send(responce);
    });
});

app.post('/chating', function (req, res) {
    connection.query('INSERT INTO chating SET ?', req.body,
        function (err, result) {
            if (err) throw err;
        }
    );
    res.sendStatus(200);
});

app.get('/goods', function (req, res) {
    connection.query('SELECT * FROM goods', function (err, responce) {
        if (err) throw err;
        res.status(200).send(responce);
    });
});

app.post('/goods', function (req, res) {
    connection.query('INSERT INTO goods SET ?', req.body,
        function (err, result) {
            if (err) throw err;
        }
    );
    res.sendStatus(200);
});


//reviews


app.get('/reviews', function (req, res) {
    connection.query('SELECT * FROM reviews', function (err, responce) {
        if (err) throw err;
        res.status(200).send(responce);
    });
});

app.post('/reviews', function (req, res) {
    connection.query('INSERT INTO reviews SET ?', req.body,
        function (err, result) {
            if (err) throw err;
        }
    );
    res.sendStatus(200);
});






//fs

app.get('/items-info', function (req, res) {
    fs.readFile('./text/' + id + '.txt', {
        encoding: 'utf-8'
    }, function (err, data) {
        if (err) {
            return console.error(err);
        } else {
            res.status(200).send(data);
        }
    });
});

var id;

app.post('/items-info', function (req, res) {
    id = req.body.id;
    res.sendStatus(200);
});

//delete


app.post('/delete', function (req, res) {
    let id = req.body.id;
    let deleteItem = 'DELETE FROM goods WHERE id =' + ' ' + id;
    connection.query(deleteItem,
        function (err, result) {
            if (err) throw err;
        });
    let deleteReview = 'DELETE FROM reviews WHERE goodsname =' + ' ' + id;

    connection.query(deleteReview,
        function (err, result) {
            if (err) throw err;
        });

    fs.unlink('./text/' + id + '.txt', function (err) {
        if (err) {
            return console.error(err);
        }
    });

    res.sendStatus(200);
});

//add item

app.post('/addItem', function (req, res) {
    let obj = req.body;
    let text = req.body.txt
    delete obj.txt;
    connection.query('INSERT INTO goods SET ?', obj,
        function (err, result) {
            if (err) throw err;
            fs.writeFile('./text/' + result.insertId + '.txt', text, function (err) {
                if (err) throw err;
            });

        }
    );
    res.sendStatus(200);
});

app.post('/changeItem', function (req, res) {
    let id = req.body.currentId;
    let txt = req.body.txt;
    let obj = req.body;
    delete obj.currentId;
    delete obj.txt;

    let sql = 'UPDATE goods SET ? WHERE id =' + ' ' + id;

    connection.query(sql, obj, function (err, result) {
        if (err) throw err;
        fs.writeFile('./text/' + id + '.txt', txt, function (err) {
            if (err) throw err;
        });

    });


    res.sendStatus(200);
});



app.listen(port, function (err) {
    if (err) throw err;
    console.log('Server start on port 8000!');
});