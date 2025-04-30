# Task Management App with Keycloak Integration

This application is a task management system that integrates with Keycloak to provide user authentication, role-based access control (RBAC), and fine-grained access control on data.

## Features

- **User Authentication:** Secure user authentication integrated with Keycloak.
- **Role-Based Access Control (RBAC):** Role mapping via Keycloak to assign roles such as admin, manager, and employee to users.
- **Fine-Grained Data Access Control:** Policies and access control mechanisms to control user access to specific data or resources.
- **Task Management:** Functionality to create, edit, and delete tasks, assign tasks to users or teams, set deadlines, priorities, and track task progress.
- **Custom Authorization Logic:** Backend includes custom logic to complement Keycloak's authorization services.

## Technologies Used

- **Frontend:** React, MUI
- **Backend:** Node.js with Express.js, Postgres for data storage
- **Authentication and Authorization:** Keycloak
- **API Communication:** RESTful APIs
- **Deployment:** Docker, Docker Composer

## How to Run the Project

1. Ensure Docker and Docker Compose are installed on your machine.
2. Clone the repository and navigate to the project directory.
3. Run `docker-compose up` to start the services. This will build the Docker images if they haven't been built already.
4. The frontend will be accessible at `http://localhost:3000`, and the backend will be accessible at `http://localhost:5000`.

## License

This project is licensed under the terms of the [MIT License](LICENSE).
