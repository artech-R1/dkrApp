require('./utils/db');
require('dotenv').config()
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const router = require('./controllers/usersController');
const route = { users: require('./routes/user.route'), sign: require('./routes/auth.route') };
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')


// Ejs
app.set('view engine', 'ejs');
// Ejs Layout
app.use(expressLayouts);
// Public Static
app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// User Route Middleware
app.use('/api', route.users)
app.use('/sign', route.sign)

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});



