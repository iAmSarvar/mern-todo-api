const express = require("express");
const todoController = require("../controllers/todo.controller");
const validateBody = require("../middlewares/validateBody");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         completed:
 *           type: boolean
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, example: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, example: 10 }
 *       - in: query
 *         name: completed
 *         schema: { type: boolean, example: true }
 *       - in: query
 *         name: sort
 *         schema: { type: string, example: "-createdAt" }
 *       - in: query
 *         name: fields
 *         schema: { type: string, example: "title,completed" }
 *     responses:
 *       200:
 *         description: List of todos
 */

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Buy milk"
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */

router
  .route("/")
  .post(validateBody(["title"]), todoController.createTodo)
  .get(todoController.getAllTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a single todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Todo
 *       404:
 *         description: Not found
 *   patch:
 *     summary: Update a todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string, example: "New title" }
 *               completed: { type: boolean, example: true }
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Invalid fields/body
 *       404:
 *         description: Not found
 *   delete:
 *     summary: Delete a todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not found
 */

router
  .route("/:id")
  .get(todoController.getATodo)
  .patch(validateBody(["title", "completed"]), todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
