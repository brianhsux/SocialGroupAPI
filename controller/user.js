var mongoose   = require("mongoose"),
    express    = require("express"),
    router     = express.Router(),
    bodyParser = require("body-parser"),
    User       = require("../models/user");

// import { authenticate } from '../middleware/authMiddleware';
var { authenticate } = require("../middleware/authMiddleware");

// export default({ config, db }) => {
// module.exports = ({ config, db }) => {
    // let api = router;

// '/v1/user/add' - Create
router.post('/add', authenticate, (req, res) => {
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.avatarName = req.body.avatarName;
    newUser.avatarColor = req.body.avatarColor;

    newUser.save(err => {
        if (err) {
        res.status(500).json({ message: err });
        }
        res.status(200).json(newUser);
    });
});

// '/v1/user/' - Read
router.get('/', authenticate, (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
        res.status(500).json({ message: err });
        }
        res.status(200).json(users);
    });
});

// '/v1/user/:id' - Read 1
router.get('/:id', authenticate, (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
        res.status(500).json({ message: err });
        }
        res.status(200).json(user);
    });
});

// '/v1/user/:id' - Update
router.put('/:id', authenticate, (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(500).json({ message: err });
        }
        
        user.name = req.body.name;
        user.email = req.body.email;
        user.avatarName = req.body.avatarName;
        user.avatarColor = req.body.avatarColor;
        user.save(err => {
            if (err) {
                res.status(500).json({ message: err });
            }
            
            res.status(200).json({ message: 'User info updated' });
        });
    });
});

// 'v1/user/byEmail/:email'
router.get('/byEmail/:email', authenticate, (req, res) => {
User.findOne({ 'email': req.params.email })
    .exec((err, userData) => {
        if (err) {
            res.status(500).json({ message: err });
        }
        res.status(200).json(userData);
    });
});

// '/vq/user/:id' -Delete
router.delete('/:id', authenticate, (req, res) => {
    User.remove({
      _id: req.params.id
    }, (err, user) => {
        if (err) {
            res.status(500).json({ message: err });
        }
        res.status(200).json({ message: 'User Successfully Removed'});
    });
});

// '/v1/user/' - Delete all
router.delete('/', authenticate, (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).json({ message: err });
        }
        res.status(200).json({ message: 'Users All Removed'});
    });
});

//   return api;
// }

module.exports = router;