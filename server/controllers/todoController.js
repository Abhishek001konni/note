const createHttpError = require("http-errors");
const Todo = require("../models/Todo");

/* POST: create a new todo */
const createTodo = async (req, res, next) => {
  try {
    const { task, completed } = req.body;

    const todo = new Todo({
      task,
      completed,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedTodo = await todo.save();

    res.status(201).json({
      id: savedTodo._id,
      task: savedTodo.task,
      completed: savedTodo.completed,
      createdAt: savedTodo.createdAt,
      updatedAt: savedTodo.updatedAt,
      message: "Todo created successfully",
    });
  } catch (err) {
    next(
      createHttpError(500, "Failed to create todo", { details: err.message })
    );
  }
};

/* GET: fetch all todo */
const getAlltodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.json({
      status: "success",
      data: todos,
      message: "Todos fetched successfully",
    });
  } catch (err) {
    next(createHttpError(500, "Failed to get todos", { details: err.message }));
  }
};

/* GET: fetch a todo by id */
const getTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
     return createHttpError(404, "Todo not found");
    }
    res.json({
      status: "success",
      data: todo,
      message: "Todo fetched successfully",
    });
  } catch (err) {
    next(createHttpError(500, "Failed to get todo", { details: err.message }));
  }
};

/* PATCH: update a todo by id */
const updateTodo = async (req, res, next) => {
  try {
    const { task, completed } = req.body;
    const todo = req.todo;
    todo.task = task;
    todo.completed = completed;
    todo.updatedAt = new Date();

    const updatedTodo = await todo.save();
    res.json({
      status: "success",
      data: updatedTodo,
      message: "Todo updated successfully",
    });
  } catch (err) {
    next(
      createHttpError(500, "Failed to update todo", { details: err.message })
    );
  }
};

/* DELETE: delete a todo by id */
const deleteTodo = async (req, res, next) => {
  try {
    await req.todo.deleteOne();
    res.json("Todo deleted successfully");
  } catch (err) {
    next(
      createHttpError(500, "Failed to delete todo", { details: err.message })
    );
  }
};

module.exports = {
  createTodo,
  getAlltodos,
  getTodo,
  updateTodo,
  deleteTodo,
};
