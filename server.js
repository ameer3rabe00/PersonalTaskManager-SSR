const port = 7777;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require("path");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

global.jwt = require('jsonwebtoken');
global.addSlashes = require('slashes').addSlashes;
global.stripSlashes = require('slashes').stripSlashes;
global.was_logged = false;


let db_M = require('./database');
global.db_pool = db_M.pool;


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "./views"));
app.use(express.static("public"));


const user_Mid = require("./middleware/user_Mid");


const auth_R = require('./Routers/auth_R');
app.use('/', auth_R);


const users_R = require('./Routers/users_R');
const course_R = require('./Routers/course_R');



app.get('/', (req, res) => {
    res.render("index", {});
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
