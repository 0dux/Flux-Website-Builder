# FLUX - AI-Powered Website Builder

<div align="center">

**Transform your ideas into websites using natural language**

Build, iterate, and deploy websites through simple prompts powered by AI

[Features](#features) • [Tech Stack](#tech-stack) • [Getting Started](#getting-started) • [Usage](#usage) • [Documentation](#documentation)

</div>

---

## 🚀 Overview

FLUX is an AI-powered website builder that enables users to create and refine websites using natural language prompts. Simply describe what you want, and watch as AI generates complete, functional website code in real-time. Continue the conversation to iterate and improve your design until it's perfect.

### Key Highlights

- 🤖 **AI Code Generation** - Convert prompts to HTML/CSS/JS instantly
- 💬 **Conversational Interface** - Chat with AI to refine your website
- 🔄 **Version Control** - Track changes and rollback to any previous version
- 👀 **Live Preview** - See changes in real-time across multiple devices
- 🌐 **Community Marketplace** - Share and discover published projects
- 💳 **Credit System** - Start with 20 free credits

---

## ✨ Features

### Core Functionality

- **Natural Language to Code**: Describe your website in plain English, get production-ready code
- **Iterative Refinement**: Make changes through conversation - "make the button bigger", "change color to blue"
- **Smart Prompt Enhancement**: AI automatically improves your prompts for better results
- **Version History**: Every change creates a snapshot - never lose your work
- **Responsive Preview**: Test on phone, tablet, and desktop views instantly
- **One-Click Rollback**: Restore any previous version with a single click

### User Management

- **Authentication**: Secure login/signup with Better-Auth
- **Credit System**: 20 free credits, 5 credits per AI revision
- **Project Dashboard**: Manage all your projects in one place
- **Save & Publish**: Keep projects private or share with the community

### Developer Experience

- **Real-time Preview**: See code changes instantly rendered
- **Conversation History**: Full context maintained across sessions
- **Manual Save**: Save work in progress without AI generation
- **Delete & Manage**: Full CRUD operations on projects

---

## 🛠 Tech Stack

### Frontend Technologies

| Logo                                                                                                                    | Technology          | Purpose                                                               |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------- | --------------------------------------------------------------------- |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                     | **React 19**        | Core UI framework for building interactive user interface             |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)       | **TypeScript**      | Type-safe JavaScript for better code quality and developer experience |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)                         | **Vite**            | Lightning-fast build tool and development server                      |
| ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) | **React Router v7** | Client-side routing and navigation                                    |
| ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  | **Tailwind CSS**    | Utility-first CSS framework for rapid UI development                  |
| ![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)           | **Shadcn/ui**       | Beautiful, accessible component library built on Radix UI             |
| ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)                      | **Axios**           | Promise-based HTTP client for API requests                            |

### Backend Technologies

| Logo                                                                                                              | Technology      | Purpose                                                      |
| ----------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------ |
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)        | **Node.js**     | JavaScript runtime for building scalable server applications |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)       | **Express.js**  | Minimal and flexible Node.js web application framework       |
| ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) | **TypeScript**  | Type-safe backend code for reliability                       |
| ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)             | **Prisma ORM**  | Next-generation ORM for type-safe database access            |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) | **PostgreSQL**  | Powerful, open-source relational database                    |
| ![Better Auth](https://img.shields.io/badge/Better_Auth-FF6B6B?style=for-the-badge&logo=auth0&logoColor=white)    | **Better-Auth** | Modern authentication library for secure user management     |
| ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)             | **OpenAI API**  | AI-powered code generation using Gemini-3-Flash model        |

### Development & Tools

| Logo                                                                                                        | Technology   | Purpose                                             |
| ----------------------------------------------------------------------------------------------------------- | ------------ | --------------------------------------------------- |
| ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)                | **Git**      | Version control system for tracking code changes    |
| ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)                | **npm**      | Package manager for JavaScript dependencies         |
| ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) | **Prettier** | Code formatter for consistent code style            |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn** or **pnpm**
- **PostgreSQL** (v14 or higher)
- **OpenAI API Key** (for AI functionality)

---

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/flux-site-builder.git
cd flux-site-builder
```

### 2. Install Dependencies

**Server:**

```bash
cd server
npm install
```

**Client:**

```bash
cd client
npm install
```

### 3. Environment Setup

**Server** - Create `.env` in `/server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/flux_db"

# Authentication
BETTER_AUTH_SECRET="your-secret-key-here"
BETTER_AUTH_URL="http://localhost:5000"

# API Keys
OPENAI_API_KEY="sk-your-openai-api-key"

# CORS
TRUSTED_ORIGINS="http://localhost:5173"
```

**Client** - Create `.env` in `/client` directory:

```env
VITE_API_URL="http://localhost:5000"
VITE_AUTH_URL="http://localhost:5000"
```

### 4. Database Setup

```bash
cd server
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run the Application

**Terminal 1 - Start Server:**

```bash
cd server
npm run dev
```

**Terminal 2 - Start Client:**

```bash
cd client
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Database Studio** (optional): `npx prisma studio`

---

## 💡 Usage

### Creating Your First Project

1. **Sign Up/Login** - Create an account to get 20 free credits
2. **New Project** - Click "Create Project" and enter your initial prompt
   ```
   Example: "Create a modern landing page for a coffee shop with a hero section and menu"
   ```
3. **Wait for Generation** - AI generates your website in seconds
4. **Preview** - See your website in the live preview panel

### Making Revisions

1. **Enter Prompt** - Type what you want to change:
   ```
   Examples:
   - "Make the header background darker"
   - "Add a contact form at the bottom"
   - "Change the font to something more elegant"
   ```
2. **Submit** - Costs 5 credits per revision
3. **Review** - New version appears instantly in preview

### Version Control

- **View History** - See all versions in the sidebar
- **Rollback** - Click any version to restore it
- **Compare** - Each version shows timestamp and description

### Publishing

1. **Toggle Publish** - Make your project public
2. **Community** - Published projects appear in the marketplace
3. **Share** - Others can view (but not edit) your work

---

## 📁 Project Structure

```
flux-site-builder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route pages
│   │   ├── lib/           # Utilities & helpers
│   │   ├── configs/       # Configuration files
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
│
└── server/                # Express backend
    ├── src/
    │   ├── config/       # Server configuration
    │   ├── controllers/  # Request handlers
    │   ├── routes/       # API routes
    │   ├── middleware/   # Custom middleware
    │   └── lib/          # Utilities
    ├── prisma/
    │   ├── schema.prisma # Database schema
    │   └── migrations/   # Migration files
    └── generated/        # Prisma client

```

---

## 🔌 API Endpoints

### Authentication

```
ALL  /api/auth/*          # Better-Auth handlers
```

### User Routes

```
GET    /api/v1/user/credits                    # Get credit balance
POST   /api/v1/user/project                    # Create new project
GET    /api/v1/user/project/:projectId         # Get project details
GET    /api/v1/user/get-all-projects           # List all projects
GET    /api/v1/user/publish-toggle/:projectId  # Toggle publish status
POST   /api/v1/user/purchase-credits           # Buy credits
```

### Project Routes

```
POST   /api/v1/project/revision/:projectId               # AI revision (5 credits)
PUT    /api/v1/project/save/:projectId                   # Save manually
GET    /api/v1/project/rollback/:projectId/:versionId    # Restore version
DELETE /api/v1/project/:projectId                        # Delete project
GET    /api/v1/project/preview/:projectId                # Get preview
GET    /api/v1/project/published                         # List published
GET    /api/v1/project/published/:projectId              # Get published project
```

---

## 🗄️ Database Schema

### Core Tables

**User**

- Stores user credentials and credit balance
- Default 20 credits on signup

**WebsiteProject**

- Project metadata and current code
- Links to user, versions, and conversations

**Conversation**

- Chat history between user and AI
- Maintains context for better generations

**Version**

- Complete code snapshots
- Enables version control and rollback

**Transaction**

- Credit purchase history
- Payment tracking

**Session & Account**

- Authentication data (Better-Auth)

---

## 🎯 How It Works

### The AI Revision Process

1. **User Input** - User enters a prompt
2. **Credit Check** - System verifies sufficient credits (5 required)
3. **Prompt Enhancement** - AI improves the prompt for clarity
4. **Context Gathering** - Fetches conversation history
5. **Code Generation** - AI generates updated code with full context
6. **Version Creation** - Saves new version snapshot
7. **Database Update** - Updates current_code field
8. **Client Response** - Returns code for live preview
9. **Credit Deduction** - Deducts 5 credits from user balance

---

## 🔐 Security

- **Protected Routes** - Authentication middleware on all user endpoints
- **CORS Configuration** - Restricts origins to trusted domains
- **Session Management** - Secure session handling with Better-Auth
- **User Isolation** - Users can only access their own projects
- **Environment Variables** - Sensitive data in `.env` files

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- OpenAI for AI capabilities
- Better-Auth for authentication
- Prisma for database tooling
- Shadcn/ui for beautiful components

---

## 📧 Contact

For questions or support, please open an issue in the GitHub repository.

---

<div align="center">

⭐ Star this repo if you find it useful!

</div>
