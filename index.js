const express = require('express'); 
const app = express(); 
const passport = require('passport');
const session = require('express-session');
require('./passport')

app.use(session({ 
    secret: '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', 
    resave: false,
    saveUninitialized: false 
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 

app.get('/', (req, res) => { 
    // res.send("<button><a href='/auth'>Login With Google</a></button>") 
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login with Google</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                margin: 0;
            }

            h1 {
                color: black;
                margin-bottom: 20px;
            }

            button {
                background-color: #4285f4;
                color: #ffffff;
                padding: 10px 20px;
                font-size: 16px;
                border: none;
                cursor: pointer;
                text-decoration: none;
            }

            button:hover {
                background-color: #357ae8;
            }
        </style>
    </head>
    
    <body>
        <div>
        <h1>Google Sign-In Authentication</h1>
        <button><a href='/auth' style="text-decoration:none; color:inherit;">Login With Google</a></button>
    </div>
    </body>
    </html>
`); 
}); 

app.get('/auth' , passport.authenticate('google', { scope: 
    [ 'email', 'profile' ] 
})); 

// Auth Callback 
app.get( '/auth/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/auth/callback/success', 
        failureRedirect: '/auth/callback/failure'
})); 
  
// Success  
app.get('/auth/callback/success' , (req , res) => { 
    if(!req.user) 
        res.redirect('/auth/callback/failure'); 
    res.send("Welcome  " + req.user.email); 
}); 
  
// failure 
app.get('/auth/callback/failure' , (req , res) => { 
    res.send("Error"); 
}) 
    
app.listen(3000 , () => { 
    console.log("Server running on port 3000"); 
});