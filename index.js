const express = require('express'); 
const app = express(); 
const passport = require('passport');
const session = require('express-session');
require('./passport')

app.use(session({ 
    // name: 'google-auth-session', 
    // keys: ['key1', 'key2'] 
    secret: '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', // Set a secret to sign the session ID cookie
    resave: false, // Set to false to avoid session being saved on every request
    saveUninitialized: false 
})); 
app.use(passport.initialize()); 
app.use(passport.session()); 

app.get('/', (req, res) => { 
    res.send("<button><a href='/auth'>Login With Google</a></button>") 
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
    res.send("Welcome " + req.user.email); 
}); 
  
// failure 
app.get('/auth/callback/failure' , (req , res) => { 
    res.send("Error"); 
}) 
    
app.listen(3000 , () => { 
    console.log("Server running on port 3000"); 
});