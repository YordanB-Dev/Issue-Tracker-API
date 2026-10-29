# Issue-Tracker-API
TypeScript REST API for issue tracking, built with Node.js, Express.js, PostgreSQL, JWT authentication, and a layered Repository-Service-Controller architecture.

# Issue Tracker API

A RESTful backend API for managing issues, built with TypeScript, Node.js, Express.js, and PostgreSQL. The project demonstrates backend development concepts, including authentication, input validation, database operations, and layered architecture.

## Features

- **User Authentication** – User registration and login using JWT authentication.
- **Issue Management** – Create, retrieve, update, and delete issues.
- **Issue Statuses** – Track issues using `open`, `in_progress`, `resolved`, and `closed`.
- **Priority Levels** – Organize issues by `low`, `medium`, and `high` priority.
- **Filtering** – Filter issues by status and priority.
- **Input Validation** – Validate issue data before processing requests.
- **Error Handling** – Handle application errors with appropriate HTTP status codes.
- **Layered Architecture** – Separate repository, service, and controller responsibilities.
- **PostgreSQL Integration** – Store and retrieve application data using PostgreSQL.

## Tech Stack

- TypeScript
- Node.js
- Express.js
- PostgreSQL
- `pg` (node-postgres)
- JSON Web Tokens (JWT)
- bcrypt

## Project Structure

```text
src/
├── app.ts
├── server.ts
├── db.ts
├── middleware/
├── utils/
└── issues/
    ├── repositories/
    ├── services/
    ├── controllers/
    └── routes/
```

- **Repositories:** Handle database queries.
- **Services:** Contain business logic and validation.
- **Controllers:** Handle HTTP requests and responses.
- **Routes:** Define API endpoints.
- **Middleware:** Handle authentication and request processing.
- **Utils:** Contain shared utilities and error-handling classes.

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in a user |

### Issues

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/issue` | Retrieve issues |
| GET | `/api/issue/:id` | Retrieve an issue by ID |
| POST | `/api/issue` | Create an issue |
| PATCH | `/api/issue/:id` | Update an issue |
| DELETE | `/api/issue/:id` | Delete an issue |

Issue routes require authentication. The exact HTTP methods should match the routes configured in the application.

### Filtering

Issues can be filtered using query parameters:

```http
GET /api/issue?status=open
GET /api/issue?priority=high
GET /api/issue?status=in_progress&priority=medium
```

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- npm
- Git

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd issue-tracker-api
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root and configure the database connection, JWT secret, and server port according to your application configuration.

Example:

```env
PORT=3000
DATABASE_URL=your_database_connection_string
JWT_SECRET=your_secret_key
```

The variable names must match those used by your application.

**Security:** Never commit your `.env` file or expose real secrets in your repository.

### Database Setup

Create a PostgreSQL database and configure the required tables and relationships. Ensure your database connection settings match your environment variables.

### Run the Application

Use the development command configured in your `package.json`. For example, if your project uses `tsx`:

```bash
npx tsx watch src/server.ts
```

The API will be available at the configured port, for example:

```text
http://localhost:3000
```

## Architecture

The project follows a layered architecture to separate responsibilities and improve maintainability.

```text
HTTP Request
     |
   Routes
     |
 Middleware
     |
 Controller
     |
   Service
     |
 Repository
     |
 PostgreSQL
```

## Purpose

This project was built as part of my backend development learning journey to practice REST API design, TypeScript, authentication, relational databases, validation, and maintainable application architecture.

## Future Improvements

- Automated unit and integration tests
- API documentation with Swagger / OpenAPI
- Pagination and sorting
- Improved authorization and role-based access control
- Docker support
- Continuous integration

## License

Yordan Borisov
