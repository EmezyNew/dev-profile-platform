
# Developer Portfolio Platform Frontend

A modern React application for the Developer Portfolio Platform.

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- React Router
- React Query

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

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

The application will be available at `http://localhost:3000`.

## Project Structure

```
frontend/
├── public/         # Static assets
├── src/
│   ├── components/ # Reusable UI components
│   ├── hooks/      # Custom React hooks
│   ├── lib/        # Utility functions
│   ├── pages/      # Page components
│   ├── App.tsx     # Main application component
│   └── main.tsx    # Application entry point
└── index.html      # HTML template
```

## Features

- User profiles with personal information and skills
- Project showcases with descriptions and links
- Developer search functionality
- Review system for rating developers
- Responsive design for all devices

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run preview` - Preview the production build locally

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in local storage.

## API Integration

The frontend communicates with the backend API running on `http://localhost:8080`. See the [backend documentation](../backend/README.md) for API details.

