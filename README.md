# Parking Management System

## Project Overview
A simple parking management web application built with Node.js and Express. It allows staff to record vehicle entry and exit, calculate parking charges, and provides role-based access for assistants and administrators.

## Features
- User registration and login
- Role-based access control for assistants and admins
- Vehicle entry tracking
- Vehicle exit handling with automatic billing
- Admin dashboard for parked and exited vehicles
- Daily revenue summary
- Search functionality for vehicles using Elasticsearch
- JWT-based authentication with cookie storage

## Technologies Used
- Node.js
- Express.js
- EJS templating engine
- MongoDB with Mongoose
- JSON Web Token (JWT)
- bcryptjs for password hashing
- Elasticsearch client
- dotenv for environment configuration
- cookie-parser for managing auth cookies

## Project Structure
- app.js - Main application entry point
- routes/ - Authentication, assistant, admin, and search routes
- models/ - MongoDB schemas for users and vehicles
- middleware/ - Authentication and role verification
- views/ - EJS pages for login, registration, admin, assistant, search, and revenue
- elastic/ - Elasticsearch client setup

## Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB
- Elasticsearch

## Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in the project root with the following variables:
   ```env
   PORT=3000
   MONGO_URL=mongodb://localhost:27017/parking
   JWT_SECRET=your_secret_key
   ELASTIC_NODE=http://localhost:9200
   ```
4. Start the application:
   ```bash
   node app.js
   ```
5. Open your browser and visit:
   ```text
   http://localhost:3000/register
   ```

## Usage
- Register a new user and choose a role such as assistant or admin
- Assistant users can record vehicle entries and exits
- Admin users can view vehicle records, revenue, and search data

## Notes
- This project uses MongoDB for storing user and vehicle records.
- Elasticsearch is used for vehicle search indexing and querying.
- Make sure the MongoDB server and Elasticsearch service are running before starting the app.

## License
This project is licensed under ISC.
