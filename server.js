const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
const booksController = require('./controllers/booksController.js');
const viewRoutes = require('./routes/view.routes.js');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect mongodb heroku
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/googleBooksDB`;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB Connected on ${MONGODB_URI}`))
  .catch(err => console.log(`MONGODB ERROR: ${err}`));

// serve static; heroku
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
// }

// routes
app.use(booksController);
app.use(viewRoutes);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`
  -----------------------------
  Express Server running on: http://localhost:${PORT}!
  -----------------------------
  `);
});
