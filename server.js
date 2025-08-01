const port = 7777;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

global.addSlashes = require('slashes').addSlashes;
global.stripSlashes = require('slashes').stripSlashes;


const db_M = require('./database');
global.db_pool = db_M.pool;


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "./views"));
app.use(express.static("public"));

// addecd this cause i dont have login (only for test)
app.use((req, res, next) => {
    req.user_id = 1;
    next();
});
//end of test

const categories_R = require('./Routers/categories_R');
app.use('/categorie', categories_R);



app.get('/', (req, res) => {
    res.render("index", {});
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
