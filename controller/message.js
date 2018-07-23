var mongoose = require("mongoose"),
    express  = require("express"),
    router   = express.Router(),
    bodyParser = require("body-parser"),
    Message    = require("../models/message"),
    { authenticate } = require("../middleware/authMiddleware");

// '/v1/message/add' - Create
router.post('/add', authenticate, (req, res) => {
    let newMessage = new Message();
    newMessage.messageBody = req.body.messageBody;
    newMessage.userId = req.body.userId;
    newMessage.channelId = req.body.channelId;
    newMessage.userName = req.body.userName;
    newMessage.userAvatar = req.body.userAvatar;
    newMessage.userAvatarColor = req.body.userAvatarColor;
    
    newMessage.save(err => {
        if (err) {
            res.status(500).json({ message: err });
        }
        res.status(200).json({ message: 'Message saved successfully' })
    });
});

// '/v1/message/:id' - Update
router.put('/:id', authenticate, (req, res) => {
    let newMessage = new Message();
    Message.findById(req.params.id, (err, message) => {
        if (err) {
            res.status(500).json({ message: err });
        }
        message.messageBody = req.body.messageBody;
        message.userId = req.body.userId;
        message.channelId = req.body.channelId;
        newMessage.userName = req.body.userName;
        newMessage.userAvatar = req.body.userAvatar;
        newMessage.userAvatarColor = req.body.userAvatarColor;
    
        message.save(err => {
            if (err) {
                res.status(500).json({ message: err });
            }
            res.status(200).json({ message: 'Message updated' });
        });
    });
});

// '/v1/message/byChannel/:channelId'
router.get('/byChannel/:channelId', authenticate, (req, res) => {
    Message.find({ 'channelId' : req.params.channelId }, (err, messages) => {
        if(err) {
            res.status(500).json({ message: err });
        }
        res.status(200).json(messages);
    });
});

// '/vq/message/:id' -Delete
router.delete('/:id', authenticate, (req, res) => {
    Message.remove({
        _id: req.params.id
    }, (err, message) => {
        if (err) {
            res.status(500).json({ message: err });
        }
        res.status(200).json({ message: 'Message Successfully Removed'});
    });
});

// '/v1/message/' - Delete all
router.delete('/', authenticate, (req, res) => {
    Message.find({}, (err, users) => {
        if (err) {
            res.status(500).json({ message: err });
        }
        res.status(200).json({ message: 'Users All Removed'});
    });
});

module.exports = router;