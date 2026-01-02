# Backend

This directory contains the backend application code for the Odoo x GCET Hackathon 2026 project.

## Structure

```
backend/
├── src/
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   └── utils/        # Utility functions
├── package.json
└── .env.example
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## Technologies

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
