const express = require('express');
const router = express.Router();
module.exports = router;

const categories_Mid = require("../middleware/categories_Mid");

router.get("/Add",(req,res)=>{
    res.render("categorie_add",{
        data:{},
    });
});
router.post("/Add", [categories_Mid.Addcategorie], (req, res) => {
    res.redirect("./List");
});
router.get("/Edit/:id",[categories_Mid.GetOnecategorie],(req,res)=>{
    if(req.GoodOne) {
        res.render("categorie_add", {
            data: req.one_categorie_data,
        });
    } else{
        res.redirect("/categorie/List");
    }
});
router.post("/Edit/:id", [categories_Mid.Updatecategorie], (req, res) => {
    res.redirect("../List");
});
router.get("/List",[categories_Mid.GetAllcategories],(req,res)=>{
    res.render("categorie_list",{
        page_title : "רשימת הקורסים",
        categories : req.categories_data,
    });
});
router.post("/Delete",[categories_Mid.Deletecategorie],(req,res)=>{
    res.redirect("./List");
})