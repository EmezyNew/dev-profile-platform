
# Developer Portfolio Platform Backend

This backend is implemented in Go with MongoDB as the database.

## Requirements

- Go 1.19+
- MongoDB 4.0+

## Installation and Setup

1. Install Go: https://golang.org/doc/install
2. Install MongoDB: https://docs.mongodb.com/manual/installation/
3. Clone the repository
4. Navigate to the backend directory:
   ```bash
   cd backend
   ```
5. Install dependencies:
   ```bash
   go mod tidy
   ```
6. Start MongoDB:
   ```bash
   mongod
   ```
7. Run the backend:
   ```bash
   go run main.go
   ```

The server will run on port 8080.

## Project Structure

```
backend/
├── controllers/     # HTTP request handlers
├── middleware/      # Authentication and other middleware
├── models/          # Data models
├── repositories/    # Database access layer
├── services/        # Business logic
└── main.go          # Entry point
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login to the system

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user (requires authentication)
- `DELETE /api/users/:id` - Delete a user (requires authentication)

### Projects

- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create a new project (requires authentication)
- `PUT /api/projects/:id` - Update a project (requires authentication)
- `DELETE /api/projects/:id` - Delete a project (requires authentication)
- `GET /api/projects/user/:userId` - Get user's projects

### Reviews

- `GET /api/reviews` - Get all reviews
- `GET /api/reviews/:id` - Get review by ID
- `POST /api/reviews` - Create a new review (requires authentication)
- `PUT /api/reviews/:id` - Update a review (requires authentication)
- `DELETE /api/reviews/:id` - Delete a review (requires authentication)
- `GET /api/reviews/user/:userId` - Get reviews about a user

### Search

- `GET /api/search?q=query` - Search for users and projects

## Authentication

For authenticated requests, provide a token in the header:

```
Authorization: Bearer <token>
```

The token can be obtained during registration or login.

## Database Schema

### User
- ID: ObjectID
- Name: string
- Email: string
- Password: string (hashed)
- Title: string
- Bio: string
- Avatar: string
- Skills: []string
- Social: object (GitHub, Twitter, LinkedIn, Website)
- CreatedAt: timestamp
- UpdatedAt: timestamp
- Rating: float

### Project
- ID: ObjectID
- Title: string
- Description: string
- Image: string
- Technologies: []string
- GitHubURL: string
- LiveURL: string
- UserID: ObjectID
- UserName: string
- UserAvatar: string
- CreatedAt: timestamp
- UpdatedAt: timestamp

### Review
- ID: ObjectID
- UserID: ObjectID (user being reviewed)
- ReviewerID: ObjectID
- ReviewerName: string
- ReviewerAvatar: string
- Rating: float
- Content: string
- CreatedAt: timestamp
- UpdatedAt: timestamp

