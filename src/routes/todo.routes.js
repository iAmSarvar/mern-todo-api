const express = require("express");
const todoController = require("../controllers/todo.controller");
const validateBody = require("../middlewares/validateBody");

const router = express.Router();

router
  .route("/")
  .post(validateBody(["title"]), todoController.createTodo)
  .get(todoController.getAllTodos);

router
  .route("/:id")
  .get(todoController.getATodo)
  .patch(validateBody(["title", "completed"]), todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
