# Contributing to Dayflow HRMS

Thank you for considering contributing to Dayflow HRMS! This document provides guidelines and instructions for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Unacceptable Behavior

- Trolling, insulting/derogatory comments, and personal attacks
- Public or private harassment
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

---

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher
- Git
- Database (PostgreSQL/MySQL/MSSQL)
- Code editor (VS Code recommended)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:

```bash
git clone https://github.com/your-username/odoo-x-gcet-hackathon-26.git
cd odoo-x-gcet-hackathon-26
```

3. Add upstream remote:

```bash
git remote add upstream https://github.com/original-repo/odoo-x-gcet-hackathon-26.git
```

### Setup Development Environment

**Backend Setup:**

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your local configuration
npm run dev
```

**Frontend Setup:**

```bash
cd frontend
npm install
npm run dev
```

**Database Setup:**

```bash
cd database
# Import schema
psql -U postgres -d dayflow_hrms -f dayflow_hrms.sql
# Import seed data (optional)
psql -U postgres -d dayflow_hrms -f dayflow_hrms_seed.sql
```

---

## Development Workflow

### Branch Naming Convention

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Urgent production fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `test/` - Test additions or updates

**Examples:**
- `feature/add-employee-search`
- `bugfix/fix-attendance-calculation`
- `docs/update-api-documentation`

### Creating a New Branch

```bash
# Sync with upstream
git fetch upstream
git checkout main
git merge upstream/main

# Create feature branch
git checkout -b feature/your-feature-name
```

### Making Changes

1. Make your changes in your feature branch
2. Follow coding standards (see below)
3. Test your changes thoroughly
4. Commit with meaningful messages
5. Push to your fork
6. Create a Pull Request

---

## Coding Standards

### JavaScript/TypeScript Standards

**General Principles:**
- Write clean, readable, and maintainable code
- Follow DRY (Don't Repeat Yourself) principle
- Keep functions small and focused (single responsibility)
- Use meaningful variable and function names
- Comment complex logic

**Code Style:**

```javascript
// Use camelCase for variables and functions
const userName = 'John Doe';
function getUserData() { }

// Use PascalCase for classes and components
class UserController { }
function UserProfile() { }

// Use UPPER_CASE for constants
const MAX_LOGIN_ATTEMPTS = 5;

// Use arrow functions for callbacks
array.map(item => item.id);

// Destructuring
const { firstName, lastName } = user;

// Template literals
const message = `Hello, ${userName}!`;

// Async/await over promises
async function fetchData() {
  const data = await api.getData();
  return data;
}
```

**Backend (Node.js/Express):**

```javascript
// Controller example
const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      success: true,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// Always use try-catch in async functions
// Always use next() for error handling
// Return consistent response format
```

**Frontend (React/TypeScript):**

```typescript
// Component structure
import React from 'react';
import { useState, useEffect } from 'react';

interface UserProps {
  userId: number;
  name: string;
}

export const UserCard: React.FC<UserProps> = ({ userId, name }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user data
  }, [userId]);

  return (
    <div className="user-card">
      <h2>{name}</h2>
    </div>
  );
};

// Use TypeScript interfaces for props
// Use functional components
// Use hooks appropriately
```

### File Organization

**Backend:**
```
controllers/
  - One controller per resource
  - Named as: resourceController.js
  
models/
  - One model per table
  - Named as: ResourceName.js (PascalCase)
  
routes/
  - One route file per resource
  - Named as: resource.js
```

**Frontend:**
```
components/
  - Reusable components
  - PascalCase naming
  
pages/
  - Page components for routes
  - Named as: PageName.tsx
  
types/
  - TypeScript interfaces and types
```

### CSS/Styling Guidelines

```css
/* Use Tailwind utility classes */
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">

/* For custom styles, use semantic class names */
.user-profile-header {
  /* styles */
}

/* Avoid inline styles unless dynamic */
```

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**

```bash
feat(auth): add password reset functionality

Implemented email-based password reset with token expiration.
Includes email template and validation.

Closes #123

---

fix(attendance): correct working hours calculation

Fixed bug where overtime hours were not calculated correctly
when clock-out time exceeded midnight.

Fixes #456

---

docs(api): update authentication endpoints documentation

Added examples for password reset flow and improved error
response documentation.
```

### Commit Best Practices

- Keep commits atomic (one logical change per commit)
- Write clear and descriptive commit messages
- Reference issue numbers when applicable
- Commit frequently with meaningful changes
- Don't commit generated files or dependencies

---

## Pull Request Process

### Before Creating PR

1. **Update your branch:**
```bash
git fetch upstream
git rebase upstream/main
```

2. **Run tests:**
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

3. **Check for linting errors:**
```bash
# Backend
npm run lint

# Frontend
npm run lint
```

### Creating a Pull Request

1. Push your branch to your fork:
```bash
git push origin feature/your-feature-name
```

2. Go to GitHub and create a Pull Request

3. Fill out the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Added tests
- [ ] All tests pass
```

### PR Review Process

1. **Automated Checks:**
   - Linting passes
   - Tests pass
   - Build succeeds

2. **Code Review:**
   - At least one approval required
   - Address review comments
   - Update PR as needed

3. **Merge:**
   - Squash and merge (preferred)
   - Delete branch after merge

---

## Testing

### Backend Testing

**Unit Tests:**
```javascript
// Example test with Jest
describe('User Controller', () => {
  test('should create new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123'
    };
    
    const user = await createUser(userData);
    expect(user.email).toBe(userData.email);
  });
});
```

**API Testing:**
```bash
# Using curl
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"Email":"test@example.com","Password":"password123"}'
```

### Frontend Testing

**Component Tests:**
```typescript
import { render, screen } from '@testing-library/react';
import { UserCard } from './UserCard';

test('renders user name', () => {
  render(<UserCard userId={1} name="John Doe" />);
  expect(screen.getByText('John Doe')).toBeInTheDocument();
});
```

### Test Coverage

- Aim for 80%+ code coverage
- Test critical paths thoroughly
- Include edge cases
- Test error handling

---

## Documentation

### Code Documentation

**JSDoc for Functions:**
```javascript
/**
 * Create a new user account
 * @param {Object} userData - User registration data
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @returns {Promise<Object>} Created user object
 * @throws {ValidationError} If validation fails
 */
async function createUser(userData) {
  // Implementation
}
```

**Inline Comments:**
```javascript
// Calculate working hours excluding break time
const workingHours = calculateHours(clockIn, clockOut) - BREAK_HOURS;
```

### API Documentation

- Update API.md for new endpoints
- Include request/response examples
- Document error cases
- Add curl examples

### README Updates

- Keep README.md current
- Update setup instructions if changed
- Add new features to features list
- Update dependency versions

---

## Issue Reporting

### Bug Reports

Include:
- Clear title
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment details (OS, browser, versions)

**Template:**
```markdown
**Describe the bug**
A clear description of the bug

**To Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g. Windows 10]
- Browser: [e.g. Chrome 96]
- Version: [e.g. 1.0.0]
```

### Feature Requests

Include:
- Clear title
- Problem description
- Proposed solution
- Alternative solutions considered
- Additional context

---

## Questions and Support

- **General Questions:** Open a GitHub Discussion
- **Bug Reports:** Open a GitHub Issue
- **Security Issues:** Email team directly (don't open public issue)
- **Documentation:** Check existing docs first

---

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to Dayflow HRMS!**

We appreciate your time and effort in making this project better for everyone.
