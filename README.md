# Blog Application

A full-stack blog application built with React (TypeScript) frontend and Node.js/Express backend with SQLite database.

## Features

- 📝 Create, read, update, and delete blog posts
- 👤 Author attribution for posts
- 📅 Automatic timestamp tracking
- 🎨 Modern, responsive UI design
- 🔄 Real-time updates
- 📱 Mobile-friendly design

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **CORS** - Cross-origin resource sharing
- **UUID** - Unique identifier generation

### Frontend
- **React** - Frontend library
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS3** - Modern styling

## Project Structure

```
blog-app/
├── backend/
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── blog.db           # SQLite database (created automatically)
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   ├── services/      # API service
    │   ├── types/         # TypeScript type definitions
    │   └── App.tsx        # Main app component
    ├── public/
    └── package.json       # Frontend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation & Setup

1. **Clone or navigate to the project directory:**
   ```bash
   cd blog-app
   ```

2. **Setup Backend:**
   ```bash
   cd backend
   npm install
   npm start
   ```
   The backend server will start on `http://localhost:5000`

3. **Setup Frontend (in a new terminal):**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend will start on `http://localhost:3000`

4. **Access the Application:**
   Open your browser and go to `http://localhost:3000`

## API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint           | Description              |
|--------|-------------------|--------------------------|
| GET    | `/api/posts`      | Get all blog posts       |
| GET    | `/api/posts/:id`  | Get a specific post      |
| POST   | `/api/posts`      | Create a new post        |
| PUT    | `/api/posts/:id`  | Update a specific post   |
| DELETE | `/api/posts/:id`  | Delete a specific post   |
| GET    | `/api/health`     | Health check endpoint    |

## Sample Data

The application comes with sample blog posts that are automatically created when you first run the backend. You can:

- View all posts on the home page
- Click on a post to read the full content
- Create new posts using the "Create Post" button
- Edit existing posts by clicking "Edit" on any post
- Delete posts with the "Delete" button (with confirmation)

## Usage

### Creating a Post
1. Click "Create Post" in the navigation or on the home page
2. Fill in the title, author name, and content
3. Click "Create Post" to save

### Viewing Posts
- All posts are displayed on the home page with previews
- Click "Read More" or the post title to view the full post

### Editing Posts
1. Click "Edit" on any post card or from the post detail page
2. Modify the content as needed
3. Click "Update Post" to save changes

### Deleting Posts
1. Click "Delete" on any post
2. Confirm the deletion in the popup dialog

## Development

### Backend Development
The backend server uses Express.js with SQLite for data persistence. Key features:
- Automatic database initialization with sample data
- Input validation and error handling
- CORS enabled for frontend integration
- UUID-based post IDs for security

### Frontend Development
The frontend is built with React and TypeScript, featuring:
- Component-based architecture
- Type-safe API calls
- Responsive design
- Client-side routing with React Router
- Modern CSS with hover effects and transitions

### Database Schema

The SQLite database uses the following schema for blog posts:

```sql
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## Troubleshooting

### Common Issues

1. **CORS errors**: Make sure both frontend and backend are running on the correct ports
2. **Database not found**: The SQLite database is created automatically when the backend starts
3. **Port conflicts**: Change the PORT environment variable for the backend if needed

### Error Handling

The application includes comprehensive error handling:
- Network errors are displayed to users
- Form validation prevents empty submissions
- Loading states provide user feedback
- Confirmation dialogs prevent accidental deletions

## Future Enhancements

Potential improvements for the blog application:
- User authentication and authorization
- Image upload functionality
- Rich text editor for post content
- Search and filtering capabilities
- Comments system
- Categories and tags
- SEO optimization
- Pagination for large numbers of posts

## License

This project is open source and available under the MIT License.