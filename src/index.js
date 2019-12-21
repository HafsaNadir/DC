const express = require('express'),
path = require('path'),
morgan = require('morgan'),
mysql = require('mysql'),
myConnection = require('express-myconnection');

const app = express();

// importing routes
const customerRoutes = require('./routes/customer');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));

//connection
const config = require("./config.json")
const hafsa = config.hafsa
const hira = config.hira

const db_hafsa = mysql.createConnection(hafsa);
const db_hira = mysql.createConnection(hira);

db_hafsa.connect(err => {
    if (err) {
        console.log(err)
        console.log("not allowed")
        console.log(hafsa);

        // throw err;
    }
    else {
        console.log("connected to ", hafsa);
    }
});
db_hira.connect(err => {
    if (err) {
        console.log(err);
        console.log("not allowed");
        console.log(hira);
    }
    else {
        console.log("connected to ", hira);
    }
})
global.db = db_hafsa;
global.db2 = db_hira;


app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', customerRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
});
