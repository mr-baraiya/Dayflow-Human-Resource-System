# Dayflow HRMS Documentation

Welcome to the comprehensive documentation for Dayflow HRMS. This directory contains all project documentation for the Odoo x GCET Hackathon 2026 project.

## 📚 Documentation Overview

This documentation suite is designed to help different stakeholders understand and work with Dayflow HRMS:

- **Users**: Learn how to use the system effectively
- **Developers**: Understand the architecture and contribute to the project
- **Administrators**: Deploy and maintain the system
- **Contributors**: Follow best practices for contributing

## 📖 Available Documentation

### For End Users

#### [User Guide](USER_GUIDE.md)
**Comprehensive guide for using Dayflow HRMS**
- Getting started and system requirements
- User roles and permissions
- Authentication and account management
- Dashboard navigation
- Attendance management (clock in/out)
- Leave request submission and tracking
- Payroll information access
- Profile management
- Troubleshooting common issues
- Tips and best practices

#### [FAQ (Frequently Asked Questions)](FAQ.md)
**Quick answers to common questions**
- Account and authentication
- Attendance tracking
- Leave management
- Payroll queries
- Profile updates
- Technical issues
- Admin and HR functions
- Security and privacy
- Quick troubleshooting reference

---

### For Developers

#### [Architecture Documentation](ARCHITECTURE.md)
**Technical architecture and system design**
- System architecture overview with diagrams
- Technology stack details
  - Frontend: React, TypeScript, Vite, Tailwind CSS
  - Backend: Node.js, Express, JWT
  - Database: PostgreSQL/MySQL/MSSQL
- Frontend architecture and component structure
- Backend MVC architecture
- Database schema and relationships
- Authentication and authorization flow
- API design principles
- Security architecture
- Scalability considerations
- Performance optimization strategies

#### [API Documentation](API.md)
**Complete API reference for developers**
- Base URLs and authentication
- Common response formats
- HTTP status codes
- Authentication endpoints
  - Register, Login, Password Reset
- User management endpoints
- Attendance management endpoints
- Leave management endpoints
- Payroll endpoints
- Error handling
- Rate limiting
- API testing examples (cURL, Postman)

#### [Contributing Guide](CONTRIBUTING.md)
**Guidelines for contributing to the project**
- Code of conduct
- Getting started with development
- Development workflow
- Branch naming conventions
- Coding standards (JavaScript/TypeScript)
- File organization best practices
- Commit message guidelines
- Pull request process
- Testing requirements
- Code documentation standards
- Issue reporting templates

---

### For DevOps & Administrators

#### [Deployment Guide](DEPLOYMENT.md)
**Production deployment instructions**
- Prerequisites and system requirements
- Environment configuration
  - Backend environment variables
  - Frontend environment variables
- Database setup and migration
- Backend deployment options
  - Traditional VPS (Ubuntu/Debian)
  - Heroku deployment
  - Docker deployment
- Frontend deployment options
  - Vercel, Netlify
  - Nginx (VPS)
- SSL certificate setup
- Post-deployment tasks
  - Health checks
  - Monitoring setup
  - Backup strategy
  - Security hardening
- Maintenance procedures
- Rollback procedures
- Troubleshooting common issues
- Performance optimization
- Scaling strategies

---

## 🚀 Quick Start

### For Users
1. Read the [User Guide](USER_GUIDE.md) to learn system basics
2. Check [FAQ](FAQ.md) for quick answers
3. Contact your HR department for account setup

### For Developers
1. Review [Architecture Documentation](ARCHITECTURE.md) to understand the system
2. Check [API Documentation](API.md) for endpoint details
3. Read [Contributing Guide](CONTRIBUTING.md) before making changes
4. Set up your development environment (see main [README](../README.md))

### For Administrators
1. Follow [Deployment Guide](DEPLOYMENT.md) for production setup
2. Configure environment variables
3. Set up monitoring and backups
4. Review security hardening steps

---

## 📋 Documentation Quick Links

### Essential Reading

| Role | Must Read | Should Read | Optional |
|------|-----------|-------------|----------|
| **Employee** | User Guide, FAQ | - | Architecture (if interested) |
| **HR/Admin** | User Guide (Admin sections), FAQ | Deployment | API, Architecture |
| **Developer** | Architecture, API, Contributing | Deployment | User Guide, FAQ |
| **DevOps** | Deployment, Architecture | API, Contributing | User Guide |

---

## 🛠️ Additional Resources

### Project Resources
- **Main README**: [../README.md](../README.md) - Project overview and setup
- **Backend API Docs**: [../backend/API_DOCUMENTATION.md](../backend/API_DOCUMENTATION.md) - Detailed API examples
- **Backend README**: [../backend/README.md](../backend/README.md) - Backend setup
- **Frontend README**: [../frontend/README.md](../frontend/README.md) - Frontend setup
- **Database Schema**: [../database/README.md](../database/README.md) - Database documentation
- **Password Reset Guide**: [../backend/PASSWORD_RESET_TEST_GUIDE.md](../backend/PASSWORD_RESET_TEST_GUIDE.md)

### External References
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

---

## 📞 Support and Contact

### For Users
- **HR Support**: Contact your HR department
- **Technical Issues**: IT Support (it-support@company.com)
- **System Questions**: Refer to User Guide or FAQ

### For Developers
- **Questions**: Open a GitHub Discussion
- **Bug Reports**: Open a GitHub Issue
- **Feature Requests**: Open a GitHub Issue with enhancement label
- **Security Issues**: Email team directly (do not open public issue)

### Development Team
- **Vishal Baraiya**: Team Leader, Database Designer & Backend Developer
- **Pujan Ajmera**: Frontend UI & Layout, API Integration
- **Haresh Zapadiya**: Frontend Components, UX & Accessibility
- **Dhruvrajsinh Zala**: Testing & Documentation

**Mentor**: Dishant Mistry (Odoo)

---

## 📝 Documentation Standards

### General Guidelines
- Use clear and concise language
- Include code examples where applicable
- Keep documentation up-to-date with code changes
- Use proper markdown formatting
- Add screenshots for visual clarity
- Include error examples and troubleshooting steps

### Writing Style
- Use active voice
- Write in second person (you/your) for user guides
- Use present tense
- Be inclusive and avoid jargon
- Provide step-by-step instructions for processes

### Formatting
- Use headings hierarchically (H1 → H2 → H3)
- Use code blocks with syntax highlighting
- Use tables for comparison data
- Use lists for sequential steps
- Use blockquotes for important notes

### Maintenance
- Review documentation quarterly
- Update version numbers and dates
- Archive outdated documentation
- Test all code examples and links
- Gather user feedback for improvements

---

## 🔄 Document Versions

| Document | Version | Last Updated | Status |
|----------|---------|--------------|--------|
| README.md | 1.0.0 | January 2026 | Current |
| USER_GUIDE.md | 1.0.0 | January 2026 | Current |
| FAQ.md | 1.0.0 | January 2026 | Current |
| ARCHITECTURE.md | 1.0.0 | January 2026 | Current |
| API.md | 1.0.0 | January 2026 | Current |
| DEPLOYMENT.md | 1.0.0 | January 2026 | Current |
| CONTRIBUTING.md | 1.0.0 | January 2026 | Current |

---

## 📜 License

All documentation is released under the MIT License, same as the project.

---

## 🙏 Acknowledgments

Special thanks to:
- **Odoo** for organizing the hackathon
- **GCET** for hosting the event
- **Dishant Mistry** for mentorship
- All contributors and users of Dayflow HRMS

---

## 💡 Contributing to Documentation

Found an error or want to improve the documentation?

1. Fork the repository
2. Make your changes
3. Submit a pull request
4. Follow the [Contributing Guide](CONTRIBUTING.md)

Good documentation helps everyone! Your contributions are welcome.

---

**Dayflow HRMS** - *Every workday, perfectly aligned.*

**Project**: Odoo x GCET Hackathon 2026  
**Version**: 1.0.0  
**Last Updated**: January 2026
