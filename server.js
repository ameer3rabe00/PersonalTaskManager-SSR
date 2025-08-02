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
global.jwt = require('jsonwebtoken');

const db_M = require('./database');
global.db_pool = db_M.pool;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "./views"));
app.use(express.static("public"));

const user_Mid = require("./middleware/user_Mid");


const auth_R = require('./Routers/auth_R');
const categories_R = require('./Routers/categories_R');
const tasks_R = require('./Routers/tasks_R');
const users_R = require('./Routers/users_R');

app.use('/', auth_R);

app.use('/categorie', [user_Mid.isLogged], categories_R);
app.use('/tasks', [user_Mid.isLogged], tasks_R);
app.use('/users', [user_Mid.isLogged], users_R);
// Home page redirect
app.get('/', (req, res) => {
    res.redirect('/login');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});