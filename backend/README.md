# Task Management - Backend

This is the backend for the task management application. It is built using Node.js and Express.js.

## API Routes

- `GET /api/tasks`: Get all tasks.
- `POST /api/tasks`: Create a new task.
- `GET /api/tasks/:id`: Get a specific task by ID.
- `PUT /api/tasks/:id`: Update a specific task by ID.
- `DELETE /api/tasks/:id`: Delete a specific task by ID.

- `GET /api/users`: Get all users.
- `POST /api/users`: Create a new user.
- `GET /api/users/:id`: Get a specific user by ID.
- `PUT /api/users/:id`: Update a specific user by ID.
- `DELETE /api/users/:id`: Delete a specific user by ID.

## Getting Started

To run this project locally, you need to have Node.js and npm installed on your machine.

1. Clone the repository and navigate to the backend directory.
2. Install the dependencies with `npm install`.
3. Start the development server with `npm start`.
4. The API will be accessible at `http://localhost:5000`.

## Docker Deployment

This application is also configured to be run as a Docker container.

1. Build the Docker image with `docker build -t task-management-backend .`.
2. Run the Docker container with `docker run -p 5000:5000 task-management-backend`.
3. The API will be accessible at `http://localhost:5000`.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the terms of the [MIT License](LICENSE).