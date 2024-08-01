Basic To-Do List Application

Task Description:

Create a basic To-Do list application that allows users to register, login, and manage their to-do items. This application should use Node.js, Supabase, and MongoDB for the backend. Deploy the backend using Render and create a simple front-end interface with Netlify.

Requirements:

1. Setup:
  * Initialize a Node.js project.
  * Install necessary dependencies (Express.js, Supabase client, Mongoose, etc.).
2. Database:
  * Create a MongoDB database to store user information and to-do items.
  * Define schemas and models for users and to-do items.
3. User Authentication:
  * Implement user registration and login using Supabase.
  * Store user information securely in MongoDB.
4. To-Do Operations:
  * Allow users to create, read, update, and delete their to-do items.
  * Ensure each user can only access their own to-do items.
5. Session Management:
  * Generate and manage user sessions upon login.
  * Record session instances (login time, logout time, IP address) in MongoDB.
6. API Endpoints:
  * POST /register: Register a new user.
  * POST /login: Log in an existing user and create a session.
  * POST /todos: Create a new to-do item.
  * GET /todos: Retrieve all to-do items for the logged-in user.
  * PUT /todos/:id: Update a to-do item by ID.
  * DELETE /todos/:id: Delete a to-do item by ID.
  * GET /sessions: Retrieve all user sessions.
7. Deployment:
  * Deploy the backend on Render.
  * Create a simple front-end interface to manage to-do items and deploy it on Netlify.
8. Documentation:
  * Provide API documentation with example requests and responses.
  * Document deployment steps and provide links to the deployed applications.
