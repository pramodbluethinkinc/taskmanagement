# Task Management - Frontend

This is the frontend for the task management application. It is built using React and Semantic UI.

## Features

- User Authentication: Users can log in and log out.
- Task Management: Users can create, edit, and delete tasks.
- User Roles: Different views and permissions based on user roles (admin, manager, employee).

## Getting Started

To run this project locally, you need to have Node.js and npm installed on your machine.

1. Clone the repository and navigate to the frontend directory.
2. Install the dependencies with `npm install`.
3. Start the development server with `npm start`.
4. The application will be accessible at `http://localhost:3000`.

## Docker Deployment

This application is also configured to be run as a Docker container.

1. Build the Docker image with `docker build -t task-management-frontend .`.
2. Run the Docker container with `docker run -p 3000:3000 task-management-frontend`.
3. The application will be accessible at `http://localhost:3000`.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

This project is licensed under the terms of the [MIT License](LICENSE).