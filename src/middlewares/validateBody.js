const AppError = require("../utils/appError");

const validateBody = (allowedFields) => (req, res, next) => {
  const body = req.body || {};
  const keys = Object.keys(body);

  if (keys.length === 0)
    return next(new AppError("Request body is required", 400));

  const invalid = keys.filter((k) => !allowedFields.includes(k));

  if (invalid.length) {
    return next(new AppError(`Invalid fields: ${invalid.join(", ")}`, 400));
  }

  next();
};

module.exports = validateBody;
