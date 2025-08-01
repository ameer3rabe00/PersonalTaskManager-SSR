const express = require('express');
const router = express.Router();
module.exports = router;

const categories_Mid = require("../middleware/categories_Mid");

router.get("/Add", (req, res) => {
    res.render("category_add", {
        data: {},
    });
});

router.post("/Add", [categories_Mid.AddCategorie], (req, res) => {
    res.redirect("./List");
});

router.get("/Edit/:id", [categories_Mid.GetOneCategorie], (req, res) => {
    if (req.GoodOne) {
        res.render("category_add", {
            data: req.one_categorie_data,
        });
    } else {
        res.redirect("/categories/List");
    }
});

router.post("/Edit/:id", [categories_Mid.UpdateCategorie], (req, res) => {
    res.redirect("../List");
});

router.get("/List", [categories_Mid.GetAllCategories], (req, res) => {
    res.render("category_list", {
        page_title: "רשימת הקטגוריות",
        categories: req.categories_data,
    });
});

router.post("/Delete", [categories_Mid.DeleteCategorie], (req, res) => {
    res.redirect("./List");
});
