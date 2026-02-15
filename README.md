# MERN Todo App

A production-ready RESTful Todo API built with Node.js, Express, and MongoDB.  
This project focuses on clean architecture, scalable query handling, validation, security, and API documentation.

## Tech Stack

- MongoDB (Mongoose)
- Express.js
- Node.js
- Swagger (OpenAPI)
- Helmet
- Express Rate Limit

## Features

- Full CRUD functionality
- Pagination support
- Filtering by completed status
- Sorting and field limiting
- Total results and totalPages metadata
- Global error handling system
- Custom AppError class
- Async error wrapper
- Request body validation middleware
- Security middleware (Helmet, rate limiting, sanitization)
- Interactive Swagger API documentation

## API Documentation

Interactive API docs available at:

http://localhost:4000/api-docs

## Environment Variables

Create a `.env` file based on `.env.example`:

PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<db>
NODE_ENV=development
CLIENT_ORIGIN=http://localhost:5173

## Setup

```bash
# Clone the repository
git clone https://github.com/iAmSarvar/mern-todo-api.git

# Navigate into the project
cd mern-todo-api

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Run development server
npm run dev
```
