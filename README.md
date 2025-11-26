# BlogSpace - Full Stack Blog Application

A modern, feature-rich blog application built with React and Node.js featuring a premium dark theme design with glassmorphism effects.

## 🚀 Features

### Backend
- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **JWT Authentication** for secure user sessions
- **Blog Post Management** - Create, Read, Update, Delete
- **Comment System** with nested replies
- **Like System** for posts and comments
- **Category & Tag Management**
- **Search & Filtering** functionality
- **User Profile Management**

### Frontend
- **React 18** with Vite for fast development
- **React Router** for client-side routing
- **Rich Text Editor** with React Quill
- **Premium Dark Theme** with glassmorphism
- **Responsive Design** for all devices
- **Authentication Flow** with protected routes
- **User Dashboard** with analytics
- **Search & Filter** by categories and tags
- **Real-time Like & Comment** updates

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

## 🛠️ Installation

### 1. Clone or Navigate to the Project

```bash
cd "Blog Application"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory (already created with default values):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-app
JWT_SECRET=blog_secret_key_2025_change_this_in_production
NODE_ENV=development
```

**Important:** If using MongoDB Atlas, replace `MONGODB_URI` with your connection string.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## 🚀 Running the Application

### Start MongoDB (if using local installation)

```bash
# On Windows
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
```

### Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📱 Usage

1. **Register** a new account at `/register`
2. **Login** with your credentials at `/login`
3. **Create** blog posts from the dashboard
4. **Browse** posts on the home page
5. **Read** full posts and leave comments
6. **Manage** your posts from the dashboard
7. **Update** your profile information

## 🎨 Design Features

- **Dark Theme** with vibrant gradients
- **Glassmorphism** effects on cards and navigation
- **Smooth Animations** and transitions
- **Premium Typography** with Google Fonts (Inter & Outfit)
- **Responsive Grid** layouts
- **Custom Scrollbar** styling
- **Interactive Hover** effects

## 📁 Project Structure

```
Blog Application/
├── backend/
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Auth middleware
│   ├── server.js        # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/         # Axios configuration
    │   ├── components/  # Reusable components
    │   ├── context/     # React context
    │   ├── pages/       # Page components
    │   ├── App.jsx      # Main app component
    │   └── index.css    # Global styles
    ├── index.html
    └── package.json
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Posts
- `GET /api/posts` - Get all posts (with pagination, search, filter)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (auth required)
- `PUT /api/posts/:id` - Update post (auth required)
- `DELETE /api/posts/:id` - Delete post (auth required)
- `POST /api/posts/:id/like` - Like/unlike post (auth required)

### Comments
- `GET /api/posts/:postId/comments` - Get comments for post
- `POST /api/posts/:postId/comments` - Add comment (auth required)
- `DELETE /api/comments/:id` - Delete comment (auth required)

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Protected API routes
- Input validation with express-validator
- CORS enabled for frontend communication

## 🎯 Future Enhancements

- Image upload functionality
- Email verification
- Password reset
- Social media sharing
- Bookmark/save posts
- User following system
- Notifications
- Admin panel

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created with ❤️ for the blogging community

---

**Happy Blogging! 📝✨**
