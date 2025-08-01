var md5 = require('md5');
global.jwt = require('jsonwebtoken');

async function isLogged(req, res, next) {
    const jwtToken = req.cookies.TaskAppCookie;
    let user_id = -1;
    
    if (jwtToken !== undefined && jwtToken !== "") {
        jwt.verify(jwtToken, 'myPrivateKey', async (err, decodedToken) => {
            if (err) {
                console.log("JWT Error:", err);
            } else {
                let data = decodedToken.data;
                user_id = data.split(",")[0];
                req.user_id = user_id;
            }
        });
    }
    
    if (user_id < 0) {
        res.redirect("/login");
    } else {
        next();
    }
}

async function CheckLogin(req, res, next) {
    let uname = (req.body.uname !== undefined) ? addSlashes(req.body.uname) : "";
    let passwd = (req.body.passwd !== undefined) ? req.body.passwd : "";
    let enc_pass = md5("A" + passwd);
    
    let Query = `SELECT * FROM users WHERE uname = '${uname}' AND passwd = '${enc_pass}'`;

    const promisePool = db_pool.promise();
    let rows = [];
    req.validUser = false;
    
    try {
        [rows] = await promisePool.query(Query);
        
        if (rows.length > 0) {
            req.validUser = true;
            let val = `${rows[0].id},${rows[0].name}`;
            var token = jwt.sign(
                { data: val },
                'myPrivateKey',
                { expiresIn: 31 * 24 * 60 * 60 } // 31 days in seconds
            );
            
            res.cookie("TaskAppCookie", token, {
                maxAge: 31 * 24 * 60 * 60 * 1000, // 31 days in ms
            });
        }
    } catch (err) {
        console.log(err);
    }

    next();
}

async function AddUser(req, res, next) {
    let name = (req.body.name !== undefined) ? addSlashes(req.body.name) : "";
    let uname = (req.body.uname !== undefined) ? addSlashes(req.body.uname) : "";
    let passwd = (req.body.passwd !== undefined) ? req.body.passwd : "";
    let enc_pass = md5("A" + passwd);
    let email = (req.body.email !== undefined) ? addSlashes(req.body.email) : "";
    let tz = (req.body.tz !== undefined) ? addSlashes(req.body.tz) : "";

    let Query = "INSERT INTO users";
    Query += "( `name`, `uname`, `passwd`, `email`, `tz`)";
    Query += " VALUES ";
    Query += `( '${name}', '${uname}', '${enc_pass}', '${email}', '${tz}')`;

    const promisePool = db_pool.promise();
    req.userAdded = false;
    
    try {
        await promisePool.query(Query);
        req.userAdded = true;
    } catch (err) {
        console.log(err);
    }

    next();
}

async function UpdateUser(req, res, next) {
    let id = parseInt(req.params.id);
    if (id <= 0) {
        req.GoodOne = false;
        return next();
    }
    req.GoodOne = true;

    let name = (req.body.name !== undefined) ? addSlashes(req.body.name) : "";
    let uname = (req.body.uname !== undefined) ? addSlashes(req.body.uname) : "";
    let email = (req.body.email !== undefined) ? addSlashes(req.body.email) : "";
    let tz = (req.body.tz !== undefined) ? addSlashes(req.body.tz) : "";

    let Query = `UPDATE users SET `;
    Query += `name='${name}', `;
    Query += `uname='${uname}', `;
    Query += `email='${email}', `;
    Query += `tz='${tz}' `;
    Query += `WHERE id='${id}'`;

    const promisePool = db_pool.promise();
    try {
        await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    next();
}

async function GetAllUsers(req, res, next) {
    let page = 0;
    let rowPerPage = 10;
    
    if (req.query.p !== undefined) {
        page = parseInt(req.query.p);
    }
    req.page = page;

    let countQuery = "SELECT COUNT(id) AS cnt FROM users";
    const promisePool = db_pool.promise();
    let total_rows = 0;
    
    try {
        const [rows] = await promisePool.query(countQuery);
        total_rows = rows[0].cnt;
    } catch (err) {
        console.log(err);
    }
    req.total_pages = Math.floor(total_rows / rowPerPage);

    let Query = "SELECT * FROM users";
    Query += ` ORDER BY name ASC LIMIT ${page * rowPerPage},${rowPerPage}`;

    req.users_data = [];
    try {
        const [rows] = await promisePool.query(Query);
        req.users_data = rows;
    } catch (err) {
        console.log(err);
    }

    next();
}

async function GetOneUser(req, res, next) {
    let id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        req.GoodOne = false;
        return next();
    }
    req.GoodOne = true;

    let Query = `SELECT * FROM users WHERE id='${id}'`;
    const promisePool = db_pool.promise();
    req.one_user_data = {};

    try {
        const [rows] = await promisePool.query(Query);
        if (rows.length > 0) {
            req.one_user_data = rows[0];
        } else {
            req.GoodOne = false;
        }
    } catch (err) {
        console.log(err);
        req.GoodOne = false;
    }

    next();
}

async function DeleteUser(req, res, next) {
    let id = parseInt(req.body.id);
    if (id > 0) {
        let Query = `DELETE FROM users WHERE id='${id}'`;
        const promisePool = db_pool.promise();
        try {
            await promisePool.query(Query);
        } catch (err) {
            console.log(err);
        }
    }

    next();
}

module.exports = {
    CheckLogin,
    isLogged,
    AddUser,
    UpdateUser,
    GetAllUsers,
    GetOneUser,
    DeleteUser,
};