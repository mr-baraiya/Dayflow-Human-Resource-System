# Frontend

This directory contains the frontend application code for the Odoo x GCET Hackathon 2026 project.

## Structure

```
frontend/
├── src/
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── services/     # API services
│   ├── utils/        # Utility functions
│   └── styles/       # Global styles
├── public/           # Static assets
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

- React
- Tailwind CSS
- Axios
- React Router
