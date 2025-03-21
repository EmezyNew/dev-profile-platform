
# Developer Portfolio Platform

A full-stack application for developers to showcase their portfolios, projects, and skills.

## Project Structure

This project consists of two main parts:

- `frontend/` - React frontend application
- `backend/` - Go backend API with MongoDB

## Getting Started

Follow these instructions to set up and run both the frontend and backend parts of the application.

### Prerequisites

- Node.js 18+ and npm for the frontend
- Go 1.19+ for the backend
- MongoDB 4.0+ for the database

## Backend Setup

1. Make sure MongoDB is installed and running:
   ```bash
   # Start MongoDB (the command may vary depending on your installation)
   mongod
   ```

2. Navigate to the backend directory:
   ```bash
   cd backend
   ```

3. Install dependencies:
   ```bash
   go mod tidy
   ```

4. Run the backend server:
   ```bash
   go run main.go
   ```

The backend server will start on `http://localhost:8080`.

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend development server will start on `http://localhost:3000`.

## Features

- User profiles with skills, bio, and social links
- Project portfolios with descriptions, technologies, and links
- Review and rating system for developers
- Search functionality for finding developers by name or skills
- Responsive design for mobile and desktop

## API Documentation

For detailed API documentation, see the [Backend README](./backend/README.md).

