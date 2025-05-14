const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./db'); // ✅ Import MongoDB connection

const app = express();

// ✅ Connect to MongoDB
connectDB();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // ✅ Enable method override

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

// Redirect root to /posts
app.get('/', (req, res) => {
    res.redirect('/posts');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
