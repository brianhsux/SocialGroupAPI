if (process.env.NODE_ENV !== 'production') require('dotenv').config()

var express     = require("express"),
    app         = express(),
    http        = require("http"),
    bodyParser  = require("body-parser"),
    passport    = require("passport"),
    Account     = require('./models/account'),
    routes      = require("./routes");
    
    
const LocalStrategy  = require('passport-local').Strategy;
    
app.server = http.createServer(app);

//middleware
//parse application/json
app.use(bodyParser.json({
    limit: process.env.BODY_LIMIT
}));

//passport config
app.use(passport.initialize());
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// test register
// app.post('/v1/account/register', (req, res) => {
//     res.json({ message: 'Account register!' })
// });
    
//api routes v1
app.use('/v1', routes);    
    
// Base URL test endpoint to see if API is running
app.get('/', (req, res) => {
    res.json({ message: 'Social Group API is ALIVE!' })
});
    
app.server.listen(process.env.PORT, process.env.IP, function() {
    console.log("Social Group API Started!!");
    console.log(`Started on port ${app.server.address().port}`);
});