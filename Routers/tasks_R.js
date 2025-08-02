const express = require('express');
const router = express.Router();
module.exports = router;

const tasks_Mid = require("../middleware/tasks_Mid");
const categories_Mid = require("../middleware/categories_Mid");

router.get("/Add", [categories_Mid.GetAllCategories], (req, res) => {
    res.render("task_add", {
        data: {},
        categories: req.categories_data,
    });
});

router.post("/Add", [tasks_Mid.AddTask], (req, res) => {
    res.redirect("./List");
});

router.get("/Edit/:id", [tasks_Mid.GetOneTask, categories_Mid.GetAllCategories], (req, res) => {
    if (req.GoodOne) {
        res.render("task_add", {
            data: req.one_task_data,
            categories: req.categories_data,
        });
    } else {
        res.redirect("/tasks/List");
    }
});

router.post("/Edit/:id", [tasks_Mid.UpdateTask], (req, res) => {
    res.redirect("../List");
});

router.get("/List", [tasks_Mid.GetAllTasks, categories_Mid.GetAllCategories, categories_Mid.GetCategoriesNames], (req, res) => {
    res.render("task_list", {
        page_title: "רשימת המשימות",
        tasks: req.tasks_data,
        categories: req.categories_data,
        categories_names: req.categories_names,
        filter_params: req.filter_params,
        page: req.page,
        total_pages: req.total_pages,
    });
});

router.post("/Delete", [tasks_Mid.DeleteTask], (req, res) => {
    res.redirect("./List");
});

router.post("/Toggle", [tasks_Mid.ToggleTaskCompletion], (req, res) => {
    res.redirect("./List");
});