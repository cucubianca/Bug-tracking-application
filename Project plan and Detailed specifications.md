# Bug Tracking Application — Project Documentation

## Overview
This Bug Tracking Application is a full-stack web system designed to help student teams report, track, and manage bugs throughout a project's lifecycle.  It supports two roles:

- **Project Manager (PM)** — creates projects, assigns bugs, updates statuses
- **Tester (TST)** — joins projects and reports bugs

The system includes a **Node.js backend** with a REST API and a **React frontend** that interacts with it.

---

## Technologies Used

### Backend
- Node.js (backend server)
- Express.js (web framework)
- Sequelize ORM (database management)
- MariaDB (database)
- JSON Web Tokens (JWT) (authentication)
- bcrypt (password hashing)
- dotenv (environment management)
- CORS (cross-origin resource sharing)
- Postman (API testing)

### Frontend
- React.js (v19)
- React Router (v7)
- Axios (HTTP client)
- Vite (development environment)
- HTML5 Canvas API (for real-time animation processing)
- Vanilla CSS (custom design)

### Other
- Git & GitHub (version control)

---

## Project Structure
bug-tracker/
│
├── backend/
│   ├── src/
│   │   ├── models/          # Sequelize models (User, Project, Bug)
│   │   ├── routes/          # API endpoints
│   │   ├── controllers/     # Request handlers
│   │   ├── middleware/      # Auth and role-based access checks
│   │   ├── config/          # Database connection
│   │   └── server.js        # Entry point
│   └── scripts/             # Utility scripts (clear_bugs.js)
│
└── bugtracker-frontend/
    ├── public/
    │   └── images/          # Bug animation assets
    ├── src/
    │   ├── api/             # Axios configuration
    │   ├── context/         # AuthContext for session management
    │   ├── components/      # Reusable UI (Layout, CuteBugs)
    │   ├── pages/           # Application views
    │   ├── App.jsx          # Routing and protected routes
    │   └── index.css        # Global "Cute" design system
    └── main.jsx

---

## Phase 1 — Setup & Planning

### Repository Setup
- Created project directory structure
- Defined project scope and requirements
- Planned backend + frontend architecture

### Project Initialization
- Initialized Node.js backend
- Created Express server structure
- Initialized React frontend using Vite

---

## Phase 2 — Backend Implementation

### Database & Authentication
- Configured MariaDB connection using Sequelize
- Created models:
  - **User**: Stores credentials and roles (PM/TST).
  - **Project**: Stores project details and associations.
  - **Bug**: Stores bug reports associated with projects.
- Implemented:
  - Registration with password hashing
  - Login with JWT token generation
  - Role-based access control (PM vs TST)

### Core API Logic
Implemented RESTful endpoints for:

#### Users
- Register and Login

#### Projects
- Create project (PM only)
- Join project (TST via project name)
- List user-involved projects

#### Bugs
- Create bug (associated with a project)
- Assign bug (PM assigns to themselves via Bug Title)
- Update bug status (OPEN, IN PROGRESS, RESOLVED)
- List bugs (filtered by project involvement)

### Testing
- Verified all endpoints manually and via developer tools
- Validated authentication flow and protected routes

---

## Phase 3 — Frontend Implementation

### UI Structure
- Set up React Router with Protected Routes
- Developed custom pages for all core flows:
  - Login and Register 
  - Dashboard (Interactive grid-based layout)
  - Project Management (Create/Join/Edit)
  - Bug Management (Report/Assign/Update)

### API Integration
Configured Axios instance with:
- Persistent Base URL
- Automatic JWT Authorization header injection

---

## Phase 4 — Visual Polish & Animations

### Animated Background
- Created a `CuteBugs` component for floating background animations.
- Implemented real-time Canvas processing to remove backgrounds and ensure seamless blending with the application gradient.

---

## Security Measures
- Passwords hashed using bcrypt.
- JWT-based session management.
- Server-side role-based authorization.
- Input validation and error handling.
- Secure database connections via Sequelize.

---

## Core Features Implemented

### Authentication
- Register/Login with JWT
- Persistence of session via AuthContext

### Project Management
- PMs can create projects and update their metadata.
- Testers can join projects using a name-based lookup.

### Bug Management
- Reporting bugs with commit links and severity levels.
- PMs can assign bugs by Title.
- Real-time status updates reflecting in the project view.

### Permissions
- **PM:** Full project management, assigning bugs, updating project details.
- **TST:** Project joining, reporting bugs into joined projects.

- **PM:** Full project management, assigning bugs, updating project details.
- **TST:** Project joining, reporting bugs into joined projects.
