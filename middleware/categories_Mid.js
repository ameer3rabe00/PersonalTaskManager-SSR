async function AddCategorie(req, res, next) {
    let name = addSlashes(req.body.name);
    let user_id = req.user_id;

    let Query = `INSERT INTO categories (user_id, name) VALUES ('${user_id}', '${name}')`;

    const promisePool = db_pool.promise();
    try {
        await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    next();
}

async function UpdateCategorie(req, res, next) {
    let id = parseInt(req.params.id);
    if (id <= 0) {
        req.GoodOne = false;
        return next();
    }
    req.GoodOne = true;

    let name = addSlashes(req.body.name);
    let Query = `UPDATE categories SET name='${name}' WHERE id='${id}'`;

    const promisePool = db_pool.promise();
    try {
        await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    next();
}

async function GetAllCategories(req, res, next) {
    let filter = (req.query.filter !== undefined) ? req.query.filter : "";
    let user_id = req.user_id;

    let Query = "SELECT * FROM categories";
    let wh = ` WHERE user_id = '${user_id}'`;

    if (filter !== "") {
        wh += ` AND name LIKE '%${filter}%'`;
    }

    Query += wh + " ORDER BY name ASC LIMIT 0,100";

    const promisePool = db_pool.promise();
    req.categories_data = [];

    try {
        const [rows] = await promisePool.query(Query);
        req.categories_data = rows;
    } catch (err) {
        console.log(err);
    }

    next();
}

async function GetCategoriesNames(req, res, next) {
    const promisePool = db_pool.promise();
    req.categories_names = [];

    try {
        const [rows] = await promisePool.query("SELECT * FROM categories");
        for (let row of rows) {
            req.categories_names[row.id] = row.name;
        }
    } catch (err) {
        console.log(err);
    }

    next();
}

async function GetOneCategorie(req, res, next) {
    let id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        req.GoodOne = false;
        return next();
    }

    req.GoodOne = true;
    let Query = `SELECT * FROM categories WHERE id='${id}'`;
    const promisePool = db_pool.promise();
    req.one_categorie_data = [];

    try {
        const [rows] = await promisePool.query(Query);
        if (rows.length > 0) {
            req.one_categorie_data = rows[0];
        }
    } catch (err) {
        console.log(err);
    }

    next();
}

async function DeleteCategorie(req, res, next) {
    let id = parseInt(req.body.id);
    if (id > 0) {
        let Query = `DELETE FROM categories WHERE id='${id}'`;
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
    AddCategorie,
    UpdateCategorie,
    GetAllCategories,
    GetCategoriesNames,
    GetOneCategorie,
    DeleteCategorie,
};
