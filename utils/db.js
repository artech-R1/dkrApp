  require('dotenv').config()
  const mongoose = require('mongoose');
  const url = process.env.DB_NAME;
  
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });

