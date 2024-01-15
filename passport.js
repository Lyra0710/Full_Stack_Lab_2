const passport = require('passport'); 
const GoogleStrategy = require('passport-google-oauth2').Strategy; 
  
passport.serializeUser((user , done) => { 
    done(null , user); 
}) 
passport.deserializeUser(function(user, done) { 
    done(null, user); 
}); 
  
passport.use(new GoogleStrategy({ 
    clientID:"634675413249-li82hg87a1pr4cjlgla3oi1os65n3cig.apps.googleusercontent.com",  
    clientSecret:"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", 
    callbackURL:"http://localhost:3000/auth/callback", 
    passReqToCallback:true
  }, 
  function(request, accessToken, refreshToken, profile, done) { 
    return done(null, profile); 
  } 
));