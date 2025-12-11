**Project Plan: Bug Tracking Application**

**Phase 1: Planning & Repository Setup** 

**Objective:** Define scope, architecture, and initialize version control.

- Create Git Repository.
- Define Project Specifications.
- Create Project Plan.
- Initialize Node.js backend project structure (package.json, folder hierarchy).
- Initialize React frontend project structure.

**Phase 2: Backend Implementation** 

**Objective:** Build a functional RESTful API connected to the database.

**Database & Auth**

- Setup PostgreSQL database connection.
- Configure Prisma ORM.
- Define User and Project models.
- Implement Registration (with student email validation).
- Implement Login (JWT generation).

**Core Logic & API**

- Define Bug model (severity, priority, status, commit links).
- Implement CRUD endpoints for Projects and Bugs.
- Implement role-based permissions (PM vs TST).

**Testing & Documentation**

- Test endpoints with Postman.
- Write API documentation (README with usage examples).

**Phase 3: Frontend Implementation** 

**Objective:** Develop the User Interface and connect it to the API.

**UI Skeleton**

- Setup React Router.
- Create Login/Register pages.
- Create Dashboard Layout (Projects + Bugs).

**Core UI Features**

- Implement Project creation and listing.
- Implement Bug reporting form.
- Implement Bug list and detail view.

**Advanced Features (Optional)**

- Add filtering by severity/priority.
- Add bug assignment and resolution update UI.
- Improve responsive design for mobile/tablet.

**Phase 4: Refinement & Deployment** 

**Objective:** Polish the application and deploy to the cloud.

- Bug Fixing: Ensure all edge cases are handled.
- Styling: Finalize CSS/Tailwind design for responsiveness.
- Deployment:
  - Deploy Database 
  - Deploy Backend
  - Deploy Frontend 
- Demo Prep: Prepare presentation for final laboratory.

**Risk Management**

- **Complexity of Permissions:** Role-based logic (PM vs TST) may be tricky. *Mitigation:* Keep permissions simple (PM manages projects and bug statuses, TST reports bugs).
- **Time Constraints:** Advanced features (filters, responsive UI) may take longer. *Mitigation:* **Focus on core features first, add extras only if time allows.**

**Detailed Specifications: Bug Tracking Application**

**1. Project Overview**

BugTracker is a web-based application designed to help student teams manage and resolve software bugs collaboratively. It allows project members (PM) to register projects, define repositories and teams, while testers (TST) can join projects and report bugs. Each bug includes severity, priority, description, and commit references. The application focuses on clear communication between team members and a simple workflow for bug assignment and resolution.

**1.1 Target Audience**

University students working on software projects who need a centralized platform to track bugs, **assign responsibilities, and monitor resolutions.**

**2. Architecture & Technologies**

**2.1 High-Level Architecture**

The application follows a standard Single Page Application (SPA) architecture:

- Client: A React.js application running in the browser.
- Server: A RESTful API built with Node.js..
- Database: A relational database accessed via an ORM.
- External Service: Integration with GitHub/GitLab commit links for bug references.

**2.2 Technology Stack**

- Frontend: React.js (component-based framework)
- Routing: React Router
- Styling: CSS Modules / Bootstrap / Tailwind CSS
- Backend: Node.js with Express.js
- Database: MariaDB
- ORM: Sequelize
- Version Control: Git (GitHub)
- Deployment: Render, Vercel, or Railway 

**3. Data Model (Relational Schema)**

The application uses a relational database. Below are the core entities:

Users

- id (PK), email (Unique), password\_hash, full\_name, created\_at.
- Roles: Project Member (PM) or Tester (TST).

Projects

- id (PK), name, description, repository\_url, created\_by (FK → User), created\_at.
- Relations: team\_members, testers.

Bugs

- id (PK), project\_id (FK), title, description, severity, priority, status, reported\_by (FK → User), assignee (FK → User, nullable), commit\_link, fix\_commit\_link, created\_at, updated\_at.

BugHistory

- id (PK), bug\_id (FK), actor\_user\_id (FK), from\_status, to\_status, note, created\_at.

**4. Functional Requirements**

**4.1 User Authentication & Profile**

- Registration: Users register with a valid email address.
- Login: Secure login using JWT (JSON Web Tokens).
- Profile: View and edit basic user details.

**4.2 Project Management**

- Create: PMs can register a project with repository URL and team members.
- Update: PMs can edit project details.
- Join: Students outside the team can join as testers (TST).

**4.3 Bug Management**

- Create: TSTs (and PMs optionally) can report bugs with severity, priority, description, and commit link.
- Read: PMs and TSTs can view bugs for projects they are associated with.
- Assign: PMs can assign a bug to themselves (only one PM per bug).
- Update: PMs can update bug status with a fix commit link.
- Lifecycle: NEW → CONFIRMED → IN\_PROGRESS → RESOLVED → CLOSED/REOPENED.

**4.4 Permissions**

- PMs: Create/modify projects, assign bugs, update bug status.
- TSTs: Report bugs.

**5. External Service Specification**

- Service: GitHub/GitLab commit links.
- Purpose: To reference the exact commit where a bug was found or fixed.
- Data Flow:
  - User provides commit link → Backend validates format → Stored in database → Displayed in bug details.

**6. Security & Quality Standards**

- Validation: All inputs (email, bug description, commit links) sanitized on the backend.
- Authentication: Passwords hashed using bcrypt. Routes protected via middleware.
- Authorization: Role-based access control (PM vs TST).
- Quality: Code organized with clear naming conventions, incremental commits, and documentation.
