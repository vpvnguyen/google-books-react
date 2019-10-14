const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", { useNewUrlParser: true, useUnifiedTopology: true });

// serve static; heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// routes
app.use(routes);

// serve index on server start
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}!`);
});
