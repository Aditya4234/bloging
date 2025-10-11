const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const dbPath = path.join(__dirname, 'blog.db');
const db = new sqlite3.Database(dbPath);

// Initialize database
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  
  // Insert sample data if table is empty
  db.get("SELECT COUNT(*) as count FROM posts", (err, row) => {
    if (row.count === 0) {
      const samplePosts = [
        {
          id: uuidv4(),
          title: "Welcome to My Blog",
          content: "This is my first blog post! I'm excited to share my thoughts and experiences with you.",
          author: "John Doe"
        },
        {
          id: uuidv4(),
          title: "Learning Web Development",
          content: "Today I want to talk about my journey learning web development. It's been challenging but rewarding...",
          author: "Jane Smith"
        }
      ];
      
      samplePosts.forEach(post => {
        db.run("INSERT INTO posts (id, title, content, author) VALUES (?, ?, ?, ?)", 
               [post.id, post.title, post.content, post.author]);
      });
    }
  });
});

// Routes

// Get all posts
app.get('/api/posts', (req, res) => {
  db.all("SELECT * FROM posts ORDER BY created_at DESC", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get single post
app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(row);
  });
});

// Create new post
app.post('/api/posts', (req, res) => {
  const { title, content, author } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }
  
  const id = uuidv4();
  db.run("INSERT INTO posts (id, title, content, author) VALUES (?, ?, ?, ?)", 
         [id, title, content, author], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    // Return the created post
    db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json(row);
    });
  });
});

// Update post
app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  
  if (!title || !content || !author) {
    return res.status(400).json({ error: 'Title, content, and author are required' });
  }
  
  db.run("UPDATE posts SET title = ?, content = ?, author = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?", 
         [title, content, author, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    // Return the updated post
    db.get("SELECT * FROM posts WHERE id = ?", [id], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(row);
    });
  });
});

// Delete post
app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  
  db.run("DELETE FROM posts WHERE id = ?", [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Blog API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Database connection closed.');
    process.exit(0);
  });
});