require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// NO LOADING MIDDLEWARE - Client-side localStorage handles it!

// Routes
const pagesRouter = require('./routes/pages');
const apiRouter = require('./routes/api');
const chatRouter = require('./routes/chat');
const leadsRouter = require('./routes/leads');
const coursesRouter = require('./routes/courses');

app.use('/', pagesRouter);
app.use('/api', apiRouter);
app.use('/api/chat', chatRouter);
app.use('/api/leads', leadsRouter);
app.use('/courses', coursesRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 Admin panel: http://localhost:${PORT}/admin`);
  console.log(`💬 Live Chat enabled`);
  console.log(`📞 Lead capture system enabled`);
  console.log(`🎓 Courses page: http://localhost:${PORT}/courses`);
});
