const express = require('express');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const seedDB = require('./backend/seedData/SeedData');
const path = require('path');
const app = express();

//Connect to a database
const url = process.env.DATABASEURL || "mongodb://localhost/commData";
mongoose.connect(url,{ useNewUrlParser: true,useCreateIndex: true, });

seedDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
const authRoutes = require("./backend/routes/auth");

app.use(authRoutes);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}
// "NODE_PATH":"src"
app.listen(port, () => console.log(`Listening on port ${port}`));