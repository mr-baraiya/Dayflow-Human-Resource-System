# Database

This directory contains database schemas, migrations, and related scripts for the Odoo x GCET Hackathon 2026 project.

## Structure

```
database/
├── schema.sql        # Database schema
├── migrations/       # Migration scripts
└── seeds/           # Seed data for testing
```

## Setup

1. Create database:
   ```bash
   createdb hackathon_db
   ```

2. Run schema:
   ```bash
   psql -d hackathon_db -f schema.sql
   ```

3. Apply migrations (if any):
   ```bash
   # Migration commands here
   ```

## Database Information

- **Type**: PostgreSQL / MySQL / SQLite
- **Name**: hackathon_db
- **Version**: [Specify version]

## Schema Overview

*Add your database schema details here*
