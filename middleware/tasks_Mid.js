async function AddTask(req, res, next) {
    let user_id = req.user_id;
    let description = (req.body.description !== undefined) ? addSlashes(req.body.description) : "";
    let target_date = (req.body.target_date !== undefined) ? addSlashes(req.body.target_date) : "";
    let category_id = (req.body.category_id !== undefined) ? Number(req.body.category_id) : "";
    let is_completed = (req.body.is_completed !== undefined) ? Number(req.body.is_completed) : 0;

    let Query = "INSERT INTO tasks";
    Query += "( `user_id`, `description`, `target_date`, `category_id`, `is_completed`)";
    Query += " VALUES ";
    Query += `( '${user_id}', '${description}', '${target_date}', '${category_id}', '${is_completed}')`;

    req.ok = false;
    const promisePool = db_pool.promise();
    try {
        await promisePool.query(Query);
        req.ok = true;
    } catch (err) {
        console.log(err);
    }

    next();
}

async function UpdateTask(req, res, next) {
    let id = parseInt(req.params.id);
    if (id <= 0) {
        req.GoodOne = false;
        return next();
    }
    req.GoodOne = true;

    let description = addSlashes(req.body.description);
    let target_date = addSlashes(req.body.target_date);
    let category_id = Number(req.body.category_id);
    let is_completed = (req.body.is_completed !== undefined) ? 1 : 0;

    let Query = `UPDATE tasks SET `;
    Query += `description='${description}', `;
    Query += `target_date='${target_date}', `;
    Query += `category_id='${category_id}', `;
    Query += `is_completed='${is_completed}' `;
    Query += `WHERE id='${id}' AND user_id='${req.user_id}'`;

    const promisePool = db_pool.promise();
    try {
        await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    next();
}

async function GetAllTasks(req, res, next) {
    let page = 0;
    let rowPerPage = 10; 
    
    if (req.query.p !== undefined) {
        page = parseInt(req.query.p);
    }
    req.page = page;

    let completion_filter = (req.query.completion_filter !== undefined) ? req.query.completion_filter : "all";
    let category_filter = (req.query.category_filter !== undefined) ? Number(req.query.category_filter) : -1;
    
    req.filter_params = {
        completion_filter: completion_filter,
        category_filter: category_filter,
    };

    
    let countQuery = "SELECT COUNT(id) AS cnt FROM tasks";
    let wh = ` WHERE user_id = '${req.user_id}'`;
    
    if (completion_filter === "completed") {
        wh += " AND is_completed = 1";
    } else if (completion_filter === "not_completed") {
        wh += " AND is_completed = 0";
    }
    
    if (category_filter > 0) {
        wh += ` AND category_id = '${category_filter}'`;
    }

    countQuery += wh;

    const promisePool = db_pool.promise();
    let total_rows = 0;
    try {
        const [rows] = await promisePool.query(countQuery);
        total_rows = rows[0].cnt;
    } catch (err) {
        console.log(err);
    }
    req.total_pages = Math.floor(total_rows / rowPerPage);

   
    let Query = "SELECT *, DATE_FORMAT(target_date,'%d-%m-%Y') AS nice_date FROM tasks";
    Query += wh;
    Query += " ORDER BY target_date ASC, is_completed ASC";
    Query += ` LIMIT ${page * rowPerPage},${rowPerPage}`;

    req.tasks_data = [];
    try {
        const [rows] = await promisePool.query(Query);
        req.tasks_data = rows;
    } catch (err) {
        console.log(err);
    }

    next();
}

async function GetOneTask(req, res, next) {
    let id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        req.GoodOne = false;
        return next();
    }
    req.GoodOne = true;

    let Query = `SELECT * FROM tasks WHERE id='${id}' AND user_id='${req.user_id}'`;
    const promisePool = db_pool.promise();
    req.one_task_data = {};

    try {
        const [rows] = await promisePool.query(Query);
        if (rows.length > 0) {
            req.one_task_data = rows[0];
        } else {
            req.GoodOne = false;
        }
    } catch (err) {
        console.log(err);
        req.GoodOne = false;
    }

    next();
}

async function DeleteTask(req, res, next) {
    let id = parseInt(req.body.id);
    if (id > 0) {
        let Query = `DELETE FROM tasks WHERE id='${id}' AND user_id='${req.user_id}'`;
        const promisePool = db_pool.promise();
        try {
            await promisePool.query(Query);
        } catch (err) {
            console.log(err);
        }
    }

    next();
}

async function ToggleTaskCompletion(req, res, next) {
    let id = parseInt(req.body.id);
    let is_completed = parseInt(req.body.is_completed);
    
    if (id > 0) {
        let Query = `UPDATE tasks SET is_completed='${is_completed}' WHERE id='${id}' AND user_id='${req.user_id}'`;
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
    AddTask,
    UpdateTask,
    GetAllTasks,
    GetOneTask,
    DeleteTask,
    ToggleTaskCompletion,
};