# Full Stack Web Application

## Project Description

This is a full-stack web application developed with Node.js, Express, MongoDB, and React. The application features user authentication, a task management system, and a feed for users to post content.

## Features Implemented

### User Authentication

- **Register**: Users can create an account using their name, email, and password.
- **Login**: Users can log in with their email and password.
- **Forgot Password**: Users can reset their password via email.
- **Google OAuth**: Integration for login and registration using Google.

### Task Management System

- **Create Task**: Users can add tasks with a name and description.
- **Task Columns**: The UI is divided into three columns: Pending, Completed, and Done. Users can drag and drop tasks between these columns, updating the task's status accordingly.
- **Delete Task**: Each task has a delete icon, prompting for confirmation before deletion.

### Feed Section

- **Post Content**: Users can create posts that include a photo and a caption.
- **Cloudinary Integration**: Utilizes Cloudinary for storing and retrieving photos.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Tailwind CSS
- **Libraries**: Axios, React Router, React Beautiful DnD, Cloudinary

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```plaintext
MONGO_URI=<your_mongodb_connection_string>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
SESSION_SECRET=<your_session_secret>
PORT=5004
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
MASTER_RESET_TOKEN=<your_master_reset_token>
JWT_SECRET=<your_jwt_secret>
```

## Routes

### User Authentication Routes

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.
- **POST /api/auth/logout**: Log out the current user.
- **POST /api/auth/forgot-password**: Request a password reset.
- **POST /api/auth/reset-password**: Reset the password using a token.

### Task Management Routes

- **GET /api/tasks**: Retrieve all tasks for the authenticated user.
- **POST /api/tasks**: Create a new task.
- **PATCH /api/tasks/:id**: Update a task by ID.
- **DELETE /api/tasks/:id**: Delete a task by ID.

### Post Management Routes

- **GET /api/posts**: Retrieve all posts.
- **POST /api/posts**: Create a new post with a photo and caption.
- **DELETE /api/posts/:id**: Delete a post by ID.

## Steps to Run the Project Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd full-stack-app
```

### 2. Set Up the Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install the necessary packages:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your environment variables.

4. Start the backend server:

   ```bash
   node server.js
   ```

### 3. Set Up the Frontend

1. Navigate to the frontend directory:

   ```bash
   cd ../frontend
   ```

2. Install the necessary packages:

   ```bash
   npm install
   ```

3. Start the frontend application:

   ```bash
   npm start
   ```

### 4. Access the Application

Open your browser and go to `http://localhost:3000` to access the application.

## Contributing

Feel free to submit issues or pull requests if you have suggestions or improvements!
