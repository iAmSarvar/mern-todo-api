const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const todoRouter = require("./routes/todo.routes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/todos", todoRouter);

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({ status: "error", message: "Server error" });
});

module.exports = app;
