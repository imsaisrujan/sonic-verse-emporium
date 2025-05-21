
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const albumRoutes = require('./server/routes/albumRoutes');
const userRoutes = require('./server/routes/userRoutes');
const cartRoutes = require('./server/routes/cartRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/melody_music_store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/albums', albumRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
