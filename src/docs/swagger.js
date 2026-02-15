const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "Simple Todo REST API built with Node, Express, MongoDB.",
    },
    servers: [{ url: "/" }],
  },
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJSDoc(options);
