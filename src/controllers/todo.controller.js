const Todo = require("../models/Todo");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createTodo = catchAsync(async (req, res, next) => {
  const newTodo = await Todo.create({
    title: req.body.title,
  });

  res.status(201).json({
    status: "success",
    data: {
      todo: newTodo,
    },
  });
});

const getATodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) return next(new AppError("Todo not found", 404));

  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
});

const getAllTodos = catchAsync(async (req, res, next) => {
  const todos = await Todo.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    data: {
      todos,
    },
  });
});

const updateTodo = catchAsync(async (req, res, next) => {
  const update = {};
  if (req.body.title !== undefined) update.title = req.body.title;
  if (req.body.completed !== undefined) update.completed = req.body.completed;

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  });

  if (!updatedTodo) return next(new AppError("Todo not found!", 404));

  res.status(200).json({
    status: "success",
    data: {
      todo: updatedTodo,
    },
  });
});

const deleteTodo = catchAsync(async (req, res, next) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);

  if (!todo) return next(new AppError("Todo not found!", 404));

  res.status(204).send();
});

module.exports = {
  createTodo,
  getATodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};
