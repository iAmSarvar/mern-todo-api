const Todo = require("../models/Todo");
const APIFeatures = require("../utils/apiFeatures");
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
  const features = new APIFeatures(Todo.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const total = await Todo.countDocuments(features.filterObj);
  const totalPages = total === 0 ? 1 : Math.ceil(total / features.limit);

  if (req.query.page && features.page > 1 && features.skip >= total) {
    return next(new AppError("This page does not exist!", 404));
  }

  const todos = await features.query;

  res.status(200).json({
    status: "success",
    results: todos.length,
    page: features.page,
    total,
    totalPages,
    data: { todos },
  });
});

const updateTodo = catchAsync(async (req, res, next) => {
  const update = {};
  if (req.body.title !== undefined) update.title = req.body.title.trim();
  if (req.body.completed !== undefined) update.completed = req.body.completed;

  if (Object.keys(update).length === 0)
    return next(new AppError("No valid fields to update", 400));

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
