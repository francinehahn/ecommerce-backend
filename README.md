<h1 align="center">API Rest LabeCommerce</h1>

##  ℹ️About
API REST developed with the objective of simulating an e-commerce and practicing Node.js, TypeScript, Express, Knex, and MySQL. CRUD (Create, Read, Update and Delete) requests were built respecting the semantics and organization necessary for the elaboration of an API with RESTful principles.

## 🔗Documentation
https://documenter.getpostman.com/view/22375317/2s8Yt1r9BE

## ☑️Requests
- Get All Users
- Get All Products
- Get Product By Id
- Get Purchases By Id
- Create Account
- Register Product
- Make A Purchase
- Edit User Information
- Edit Product Information

## 💻Technologies
- Node.js
- TypeScript
- Express.js
- Knex.js
- MySQL

## 🛰Running the project
<pre>
  <code>git clone https://github.com/francinehahn/ecommerce-backend.git</code>
</pre>

<pre>
  <code>cd ecommerce-backend</code>
</pre>

<pre>
  <code>npm install</code>
</pre>

Create a file .env and complete the following variables:
<pre>
  <code>
    DB_HOST = ""
    DB_USER = ""
    DB_PASSWORD = ""
    DB_SCHEMA = ""

    PORT = 3003
    JWT_KEY = "labecommerce"
    BCRYPT_COST = 12
  </code>
</pre>

To add the tables to your database, run the following command:
<pre>
  <code>npm run migrations</code>
</pre>

To initialize the project:
<pre>
  <code>npm run start</code>
</pre>

Finally, you can use Postman or another similar tool to test the endpoints.

