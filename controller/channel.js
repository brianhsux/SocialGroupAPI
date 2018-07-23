var mongoose = require("mongoose"),
    express  = require("express"),
    router   = express.Router(),
    bodyParser = require("body-parser"),
    Channel    = require("../models/channel"),
    User       = require("../models/user"),
    { authenticate } = require("../middleware/authMiddleware");

//'/v1/channel/add' - Create
router.post('/add', authenticate, (req, res) => {
    let newChannel = new Channel();
    newChannel.name = req.body.name;
    newChannel.description = req.body.description;
    
    newChannel.save(err => {
        if(err){
            res.status(500).json({ message: err });
        }
        res.status(200).json({ message: 'Channel saved successfully' })
    });
});

// '/v1/channel/' - Read
router.get('/', authenticate, (req, res) => {
    Channel.find({}, (err, channels) => {
        if (err) {
            res.status(500).json({ message: err });
        }
        res.status(200).json(channels);
    });
});

// '/v1/channel/:id' - Read 1
router.get('/:id', authenticate, (req, res) => {
    Channel.findById(req.params.id, (err, channel) => {
        if (err) {
            res.status(500).json({ message: err });
        }
        res.status(200).json(channel);
    });
});

// '/vq/channel/:id' -Delete
router.delete('/:id', authenticate, (req, res) => {
    User.remove({
        _id: req.params.id
    }, (err, channel) => {
        if (err) {
            res.status(500).json({ message: err });
        }
        res.status(200).json({ message: 'Channel Successfully Removed'});
    });
});

module.exports = router;