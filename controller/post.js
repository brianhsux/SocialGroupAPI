var express = require("express")
var router = express.Router();
var Post  = require("../models/post");
var middleware = require("../middleware")
var multer = require('multer');
var { authenticate } = require("../middleware/authMiddleware");
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'brianhsux', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get All Posts
router.get("/", function(req, res) {
    // find the camgrounds from DB
    Post.find({}, null, {sort: '-date'}, function(err, posts) {
        if (err) {
            console.log("Something wrong when get post from DB");
            // console.log(err);
            res.status(500).json({message: err});
        } else {
            console.log("Get posts data Success");
            console.log(posts);
            res.status(200).json(posts);
        }
    });
});

// Create Post
router.post("/add", authenticate, function(req, res) {
    
    let newPost = new Post();
    newPost.authorEmail = req.body.authorEmail
    newPost.authorName = req.body.authorName
    newPost.authorImage = req.body.authorImage
    newPost.postImage = req.body.postImage;
    newPost.postContent = req.body.postContent;
    newPost.postTime = req.body.postTime;

    newPost.save(err => {
        if (err) {
            res.status(500).json({ message: err });
        }
        console.log(newPost)
        res.status(200).json(newPost);
    });
});

// // SHOW - shows more info about one campground
// router.get("/:id", function(req, res) {
//     //find the campground with provided ID
//     var id = req.params.id;
//     Campground.findById(id).populate("comments").exec(function(err, foundCampground) {
//         if (err) {
//             console.log("Found mission fail!");
//             console.log(err);
//             res.status(500).json({message: err});
//         } else {
//             console.log("Found mission success");
//             console.log(foundCampground);
//             // res.render("campgrounds/show", {campground: foundCampground});
//             res.status(200).json(foundCampground);
//         }
//     });
// });

// SHOW ROUTE
router.get("/byId/:id", authenticate, function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            console.log(err);
            res.status(500).json({message: err});
        } else {
            // res.render("campgrounds/edit", {campground: campground});
            res.status(200).json(post);
        }
    });
});

// UPDATE ROUTE
router.put("/byId/:id", authenticate, function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            console.log(err);
            res.status(500).json({message: err});
        } else {
            post.authorEmail = req.body.authorEmail
            post.authorName = req.body.authorName
            post.authorImage = req.body.authorImage
            post.postImage = req.body.postImage;
            post.postContent = req.body.postContent;
            post.postTime = req.body.postTime;
            
            post.save(err => {
                if (err) {
                    res.status(500).json({ message: err });
                }
                console.log(post)
                res.status(200).json(post);
            });
        }
    });
});

// DELETE ROUTE
router.delete("/:id", authenticate, function(req, res) {
    console.log("remove postId: " + req.params.id)
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            // res.redirect("/campgrounds");
            res.status(500).json({message: err});
        } else {
            console.log("remove post: " + post)
            post.remove();
            // req.flash("success", "Campground deleted");
            // res.redirect("/campgrounds");
            res.status(200).json(post);
        }
    })
});

module.exports = router;