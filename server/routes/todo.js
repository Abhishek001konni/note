const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");
const getById = require("../middleware/getById");
const todoController = require("../controllers/todoController");
const { body } = require("express-validator");

// Middleware to validate the request body
const validateTodo = [
  body("task").isLength({ min: 1 }).withMessage("Title is required"),
  body("completed")
    .optional()
    .isBoolean()
    .withMessage("Completed must be a boolean"),
];

/* POST create a new todo */
router.post("/", validateTodo, todoController.createTodo);

/* GET fetch all todos */
router.get("/", todoController.getAlltodos);

/* GET fetch a todo by id */
router.get("/:id", getById(Todo, "todo"), todoController.getTodo);

/* PATCH update a todo by id */
router.patch("/:id", getById(Todo, "todo"), todoController.updateTodo);

/* DELETE delete a todo by id */
router.delete("/:id", getById(Todo, "todo"), todoController.deleteTodo);

module.exports = router;
