Here is a README file tailored to your project setup:

---

# E-commerce Application

This is an E-commerce application built with Node.js, Express, TypeScript, Mongoose, MongoDB, Zod, and Validator for validation. The application allows for managing products and orders.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Express.js](https://expressjs.com/)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [MongoDB](https://www.mongodb.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Monogoose](https://mongoosejs.com/docs/index.html)
- [ZOD](https://zod.dev/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ibnabdullah1/level-2Assignment.git
   cd level-2Assignment
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   DATABASE_URL= (Database url)
   PORT=3000
   ```

## Running the Application

1. Start the MongoDB server. If MongoDB is installed locally, you can start it with:

   ```bash
   mongod
   ```

2. Run the application:

   ```bash
   npm run dev
   ```

   The server should now be running on [http://localhost:3000](http://localhost:3000).

## API Endpoints

### Products

- **GET /api/products**: Fetch all products.
- **GET /api/products?searchTerm=term**: Search products by term.
- **GET /api/products/:id**: Fetch a single product by ID.
- **POST /api/products**: Create a new product.
- **PUT /api/products/:id**: Update a product by ID.
- **DELETE /api/products/:id**: Delete a product by ID.

### Orders

- **GET /api/orders**: Fetch all orders.
- **GET /api/orders?email=email@example.com**: Fetch orders by email.
- **POST /api/orders**: Create a new order.

## Error Handling

Sample Error Responses:

- **Insufficient Quantity Error**

  ```json
  {
    "success": false,
    "message": "Insufficient quantity available in inventory"
  }
  ```

- **Not Found Error**

  ```json
  {
    "success": false,
    "message": "Order not found"
  }
  ```

- **Not Found Route**

  ```json
  {
    "success": false,
    "message": "Route not found"
  }
  ```

## Project Structure

```plaintext
.
├── src
│   ├── app
│   │   ├── modules
│   │   │   ├── products.controller.ts
│   │   │   ├── products.interface.ts
│   │   │   ├── products.model.ts
│   │   │   ├── products.route.ts
│   │   │   ├── products.service.ts
│   │   │   ├── order.controller.ts
│   │   │   ├── order.interface.ts
│   │   │   ├── order.model.ts
│   │   │   ├── order.route.ts
│   │   │   └── order.service.ts
│   │   └── config
│   │       └── index.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```
