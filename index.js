const express = require('express');
const session = require('express-session');
const { authenticated: customerRoutes } = require('./router/auth_users.js');
const { general: genlRoutes } = require('./router/gerneral');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

app.use("/customer/auth/*", function auth(req,res,next){
//Write the authenication mechanism here
});

app.use("/customer", customerRoutes);
app.use("/", genlRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));