const express = require("express");
const todoController = require("../controllers/todo.controller");

const router = express.Router();

router
  .route("/")
  .post(todoController.createTodo)
  .get(todoController.getAllTodos);

router
  .route("/:id")
  .get(todoController.getATodo)
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
