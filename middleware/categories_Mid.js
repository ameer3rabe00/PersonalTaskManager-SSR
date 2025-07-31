async function Addcategorie(req,res,next){
    let name = addSlashes(req.body.name);
    let Query=`INSERT INTO categories ( name) VALUES ('${name}')`;
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    next();
}
async function Updatecategorie(req,res,next){
    let id = parseInt(req.params.id);
    if(id <= 0){
        req.GoodOne=false;
        return next();
    }
    req.GoodOne=true;
    let name = addSlashes(req.body.name);
    let Query=`UPDATE categories SET name='${name}' WHERE id='${id}'`;
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    next();
}
async function GetAllcategories(req,res,next){
    let filter = (req.query.filter !== undefined) ? req.query.filter : "";
    let Query="SELECT * FROM categories";
    let wh="";
    if(filter !== ""){
        wh += (wh === "")?" WHERE " : " AND ";
        wh += ` ( name LIKE '%${filter}%' )`;
    }

    Query += wh;
    Query += " ORDER BY name ASC ";
    Query+= " LIMIT 0,100 ";

    const promisePool = db_pool.promise();
    let rows=[];
    req.categories_data=[];
    try {
        [rows] = await promisePool.query(Query);
        req.ccategories_data=rows;
    } catch (err) {
        console.log(err);
    }

    next();
}
async function GetcategoriesNames(req,res,next){
    let Query="SELECT * FROM categories";

    const promisePool = db_pool.promise();
    let rows=[];
    req.categories_names=[];
    try {
        [rows] = await promisePool.query(Query);
        for(let row of rows) {
            req.categories_names[row.id] = row.name;
        }
    } catch (err) {
        console.log(err);
    }

    next();
}
async function GetOnecategorie(req,res,next){
    let id = parseInt(req.params.id);
    console.log(id)
    if((id === NaN) || (id <= 0)){
        req.GoodOne=false;
        return next();
    }
    req.GoodOne=true;
    let Query=`SELECT * FROM categories  WHERE id='${id}' `;
    const promisePool = db_pool.promise();
    let rows=[];
    req.one_categorie_data=[];
    try {
        [rows] = await promisePool.query(Query);
        if(rows.length > 0) {
            req.one_categorie_data = rows[0];
        }
    } catch (err) {
        console.log(err);
    }

    next();
}
async function Deletecategorie(req,res,next){
    let id = parseInt(req.body.id);
    if(id > 0) {
        let Query = `DELETE FROM categories WHERE id='${id}' `;
        const promisePool = db_pool.promise();
        let rows = [];
        try {
            [rows] = await promisePool.query(Query);
        } catch (err) {
            console.log(err);
        }
    }

    next();

}
module.exports = {
    Addcategorie,
    GetAllcategories,
    GetcategoriesNames,
    GetOnecategorie,
    Deletecategorie,
    Updatecategorie,
}