# 🚀 CodeSensai - Interactive Learning Platform

<div align="center">

![CodeSensai Logo](public/logo192.png)

**🎓 Learn to Code with AI-Powered Interactive Lessons**

[![React](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-orange?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.18+-black?style=for-the-badge&logo=express)](https://expressjs.com/)

*Empowering students to master programming through interactive lessons, real-time feedback, and gamified learning experiences!*

</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🎯 What You'll Learn](#-what-youll-learn)
- [🛠️ Prerequisites](#️-prerequisites)
- [⚡ Quick Start](#-quick-start)
- [🔧 Detailed Setup](#-detailed-setup)
- [📧 Email Configuration](#-email-configuration)
- [🚀 Running the Application](#-running-the-application)
- [🧪 Testing](#-testing)
- [📁 Project Structure](#-project-structure)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Features

### 🎮 **Interactive Learning Experience**
- **📚 Progressive Modules**: HTML, CSS, JavaScript, and Python
- **🎯 Real-time Code Playground**: Write and test code instantly
- **🏆 Achievement Badges**: Earn badges for completing modules
- **📊 Progress Tracking**: Monitor your learning journey
- **🎨 Beautiful UI**: Modern, responsive design with dark/light themes

### 👥 **Multi-Role System**
- **👨‍🎓 Student Dashboard**: Personalized learning experience
- **👨‍👩‍👧‍👦 Parent Dashboard**: Monitor child's progress
- **📧 Email Verification**: Secure account creation
- **🔐 JWT Authentication**: Secure login system

### 🎯 **Gamified Learning**
- **🧩 Interactive Quizzes**: Test your knowledge with fun challenges
- **🎪 Drag & Drop Activities**: Learn through hands-on practice
- **💡 Smart Feedback**: Get instant guidance and hints
- **🏅 Badge System**: Celebrate your achievements

---

## 🎯 What You'll Learn

| Module | 🎨 Content | 🏆 Badge |
|--------|------------|----------|
| **HTML** | Structure, tags, forms, semantic elements | HTML Starter |
| **CSS** | Styling, layouts, animations, responsive design | CSS Master |
| **JavaScript** | Variables, functions, DOM manipulation, events | JS Developer |
| **Python** | Syntax, data types, loops, functions | Python Developer |

---

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v6.0 or higher) - [Download here](https://mongodb.com/)
- **Git** - [Download here](https://git-scm.com/)
- **A code editor** (VS Code recommended) - [Download here](https://code.visualstudio.com/)

### 🔍 Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version  
npm --version

# Check MongoDB version
mongod --version

# Check Git version
git --version
```

---

## ⚡ Quick Start

### 1. 🚀 Clone the Repository

```bash
git clone <your-repo-url>
cd codesensai
```

### 2. 📦 Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. 🔧 Setup Environment

```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit the .env file with your configuration
# (See Email Configuration section below)
```

### 4. 🗄️ Setup Database

```bash
# Start MongoDB (if not running as a service)
mongod

# In a new terminal, run the migration script
cd backend
node migrate-existing-users.js
```

### 5. 🚀 Start the Application

```bash
# Terminal 1: Start backend server
cd backend
npm start

# Terminal 2: Start frontend development server
npm start
```

### 6. 🌐 Open Your Browser

Navigate to `http://localhost:3000` and start learning! 🎉

---

## 🔧 Detailed Setup

### Step 1: Environment Setup

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/codesensai

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false

# Frontend URL (for email links)
FRONTEND_URL=http://localhost:3000
```

### Step 2: Database Configuration

1. **Install MongoDB** (if not already installed):
   - [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
   - [macOS](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
   - [Linux](https://docs.mongodb.com/manual/administration/install-on-linux/)

2. **Start MongoDB Service**:
   ```bash
   # Windows (as Administrator)
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

3. **Create Database**:
   ```bash
   # Connect to MongoDB
   mongosh
   
   # Create and use database
   use codesensai
   
   # Exit MongoDB shell
   exit
   ```

### Step 3: Email Configuration

#### Gmail App Password Setup

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Name it "CodeSensai"
   - Copy the generated 16-character password

3. **Update .env file**:
   ```env
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-16-char-app-password
   ```

#### Test Email Configuration

```bash
cd backend
node test-email.js
```

You should see: `✅ Email configuration is working!`

---

## 🚀 Running the Application

### Development Mode

```bash
# Terminal 1: Backend Server
cd backend
npm run dev

# Terminal 2: Frontend Development Server  
npm start
```

### Production Mode

```bash
# Build frontend
npm run build

# Start production server
cd backend
npm start
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start frontend development server |
| `npm run build` | Build for production |
| `npm test` | Run frontend tests |
| `cd backend && npm start` | Start backend server |
| `cd backend && npm run dev` | Start backend with nodemon |

---

## 🧪 Testing

### Frontend Tests

```bash
npm test
```

### Backend Tests

```bash
cd backend
npm test
```

### Manual Testing Checklist

- [ ] User registration with email verification
- [ ] User login/logout
- [ ] Module navigation and content display
- [ ] Interactive quizzes and activities
- [ ] Progress tracking and badge system
- [ ] Parent dashboard functionality
- [ ] Responsive design on different screen sizes

---

## 📁 Project Structure

```
codesensai/
├── 📁 public/                 # Static assets
│   ├── 📁 assets/
│   │   ├── 📁 images/        # Learning content images
│   │   └── 📁 sounds/        # Audio feedback
│   ├── favicon.ico
│   ├── logo192.png
│   └── logo512.png
├── 📁 src/                   # Frontend source code
│   ├── 📁 components/        # Reusable React components
│   ├── 📁 pages/            # Page components
│   ├── 📁 contexts/         # React contexts
│   ├── 📁 hooks/            # Custom React hooks
│   ├── 📁 data/             # Static data (modules, etc.)
│   └── 📁 assets/           # Frontend assets
├── 📁 backend/              # Backend server
│   ├── 📁 models/           # MongoDB schemas
│   ├── 📁 routes/           # API endpoints
│   ├── 📁 services/         # Business logic
│   ├── 📁 middleware/       # Express middleware
│   └── bin/www              # Server entry point
├── package.json             # Frontend dependencies
└── README.md               # This file
```

### Key Files Explained

| File | Purpose |
|------|---------|
| `src/App.js` | Main application component |
| `src/data/modules.js` | Learning content and structure |
| `backend/routes/users.js` | User authentication and management |
| `backend/models/User.js` | User data schema |
| `backend/services/emailService.js` | Email functionality |

---

## 🎨 Customization

### Adding New Modules

1. **Update `src/data/modules.js`**:
   ```javascript
   {
     id: "new-module",
     title: "New Module",
     description: "Learn something new!",
     content: [...]
   }
   ```

2. **Add module images** to `public/assets/images/`

3. **Create badge image** for completion

### Styling Customization

- **Theme colors**: Edit `src/ThemeContext.js`
- **Component styles**: Modify styled-components in each component
- **Global styles**: Update `src/index.css`

---

## 🐛 Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| **MongoDB connection failed** | Ensure MongoDB is running: `mongod` |
| **Email not sending** | Check Gmail app password in `.env` |
| **Port 3000 in use** | Use different port: `PORT=3001 npm start` |
| **Module not loading** | Check browser console for errors |
| **Badge not showing** | Verify image path in `public/assets/images/` |

### Debug Mode

```bash
# Frontend debug
REACT_APP_DEBUG=true npm start

# Backend debug
DEBUG=* npm run dev
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and test thoroughly
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **MongoDB** for the powerful database
- **Express.js** for the robust backend framework
- **All contributors** who helped make this project possible

---

<div align="center">

**🎉 Ready to start your coding journey?**

[Get Started](#-quick-start) | [Report Issues](https://github.com/your-repo/issues) | [Join Community](https://github.com/your-repo/discussions)

---

*Made with ❤️ for the next generation of developers*

</div>
