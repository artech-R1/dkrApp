const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

/* Sign Up */
const signUp = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const newUser = await User.create(req.body);
        res.json(newUser);
        console.log(newUser);
    } catch (error) {
        return next(error);
    }
};
/* Sign In */
const signIn = async function (req, res, next) {
 try {
    const { email, password } = req.body;
         // Find user by email
     const user = await User.findOne({ email });

     if (!user) {
    // If the user doesn't exist, return an error
      return res.status(401).send('Invalid email or password');
    }

  // Check if password is correct
     const isPasswordCorrect = await bcrypt.compare(password, user.password);

     if (!isPasswordCorrect) {
    // If the password is incorrect, return an error
    return res.status(401).send('Invalid email or password');
     }

  // If the email and password are correct, create a JWT token
  // Secrete Key saved in .env file
    const mysecretkey = process.env.SECRET_KEY;

  // Payload to generate JWT
     const payload = {
      name: user.name,
      email: user.email,
      password: user.password,
  };
  // Create a jsonwebtoken that expires in 5 days
         const token = jwt.sign(payload, mysecretkey, { expiresIn: '5d' });

  // Send the token back to the client
         res.status(200).json({
         msg: "User is logged in",
         token: token
     });

    } catch (error) {
        return next(error);
    }
};


 const protect =  async(req, res) => {
    
    const token = req.header("Authorization");
    const mysecretkey = process.env.SECRET_KEY;
    try {
      // Verify token and decode payload
      const decoded = jwt.verify(token, mysecretkey);
  
      // Get user email from payload
      const userEmail = decoded.email;
  
      // Find user by email in the database
      const user = await User.findOne({ email: userEmail });
  
      if (user) {
        res.json({ message: `Welcome ${user.name}! This is a protected route.` });
      } else {
        res.status(401).json({ error: 'Invalid token' });
      }
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };



module.exports ={ signUp, signIn, protect };
