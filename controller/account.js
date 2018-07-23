var mongoose = require("mongoose"),
    express  = require("express"),
    router   = express.Router(),
    config  = require("../config"),
    bodyParser = require("body-parser"),
    passport   = require("passport"),
    Account    = require("../models/account"),
    UserDataExt = require("./extentions/userData-ext");

var { generateAccessToken, respond, authenticate } = require("../middleware/authMiddleware");

// module.exports =  ({ config, db }) => {
  // let api = router;

// '/v1/account/register'
router.post('/register', (req, res) => {
    UserDataExt.findUserByEmail(req.body.email, (err, userData) => {
        if (err) {
            return res.status(409).json({ message: `An error occured: ${err.message}`});
        } else if (userData) {
            return res.status(300).json({ message: `Email ${req.body.email} is already registered`});
        }
        
        Account.register(new Account({ username: req.body.email }), req.body.password, function(err, account) {
            if (err) {
                return res.status(500).json({ message: err });
            }
            
            passport.authenticate('local', { session: false })(req, res, () => {
                res.status(200).send('Successfully created new account');
            });
        });
    });
});

// '/v1/account/login'
router.post('/login', (req, res, next) => {
    UserDataExt.findUserByEmail(req.body.email, (err, userData) => {
        if (err) {
            res.status(409).json({ message: `An error occured: ${err.message}`});
        } else {
      		  next();
      	}
    });
}, passport.authenticate('local', { session: false, scope: [], failWithError: true }), (err, req, res, next) => {
  	if (err) {
  	  	res.status(401).json({ message: `Email or password invalid, please check your credentials`});
  	}
}, generateAccessToken, respond);

// '/v1/account/logout'
router.get('/logout', authenticate, (req, res) => {
    res.logout();
    res.status(200).send('Successfully logged out');
});

router.get('/me', authenticate, (req, res) => {
    res.status(200).json(req.user);
});

//   return api;
// } 

module.exports = router;