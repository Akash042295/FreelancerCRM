# 🚀 MERN CRM System

A modern **Customer Relationship Management (CRM)** application built with the **MERN Stack (MongoDB, Express.js, React, Node.js)**. The system helps businesses manage customers, leads, tasks, and communication through a secure role-based platform.

---

## 📌 Overview

This CRM is designed to streamline customer relationship management by providing dedicated dashboards and features for different user roles.

### 👥 User Roles

* **Admin**

  * Manage customers
  * Manage leads
  * Assign tasks
  * View analytics
  * Chat with customers
  * Monitor business performance

* **Customer**

  * View profile
  * Track assigned tasks
  * Chat with admin

---

# ✨ Features

### 🔐 Authentication & Security

* JWT Authentication
* Protected Routes
* Role-Based Access Control (RBAC)
* Password Encryption (bcrypt)

### 📊 Dashboard

* Total Customers
* Revenue Overview
* Active Tasks
* Recent Activities

### 👥 Customer Management

* Add Customer
* Update Customer
* Delete Customer
* Search Customers

### ✅ Task Management

* Create Tasks
* Assign Tasks
* Update Task Status
* Task Priority
* Due Dates

### 💬 Chat System

* Real-time Admin ↔ Customer Chat
* Typing Indicator
* Message History

### 📈 Analytics

* Revenue Analytics
* Lead Analytics
* Customer Statistics
* Task Reports

### 👤 Profile Management

* Update Profile
* Change Personal Information

### 🎨 Modern UI

* Fully Responsive
* Clean Dashboard
* Animated Components
* Mobile Friendly

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router
* Framer Motion

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

---

# 📁 Project Structure

```text
mern-crm/
│
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/FreelanceerCRM.git
```

```bash
cd FreelancerCRM
```

---

## Backend Setup

```bash
cd Backend
npm install
npm run dev
```

---

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **Backend** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

For Frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

---


# 📡 API Modules

* Authentication
* Users
* Customers
* Tasks
* Analytics
* Chat

---

# 🔒 Security

* JWT Authentication
* Password Hashing
* Protected API Routes
* Role-Based Authorization

---

# 🚀 Future Improvements

* Email Notifications
* Calendar Integration
* Report Export (PDF/Excel)
* Activity Logs
* AI-powered CRM Insights
* Multi-language Support

---


# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Rahul Hemla**

* Full Stack MERN Developer
* Passionate about building scalable web applications
* Open to collaboration and learning opportunities

---

⭐ If you like this project, don't forget to **star** the repository.
