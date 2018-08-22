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

router.get("/", function(req, res) {
    // find the camgrounds from DB
    // Post.find({}, function(err, posts) {
    // Post.find({}).sort({date: -1}).exec(function(err, posts) {
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
    
    // cloudinary.uploader.upload(req.file.path, function(result) {
        // console.log("=====Uploader=====");
        // console.log(result);
        // add cloudinary url for the image to the campground object under image property
        // req.body.campground.image = result.secure_url;
        // add author to campground
        // req.body.campground.author = {
        //     id: req.user._id,
        //     username: req.user.username
        // }
        
            // Post.create(req.body.post, function(err, post) {
            // if (err) {
            //     // req.flash('error', err.message);
            //     // return res.redirect('back');
            //     res.status(500).json({message: err});
            // } else {
            //     res.status(200).json(post);
            // }
            // });
    // });
});

// router.get("/new", authenticate, function(req, res) {
//     res.render("campgrounds/new");
// });

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

// // EDIT ROUTE
// router.get("/:id/edit", authenticate, function(req, res) {
//     Campground.findById(req.params.id, function(err, campground) {
//         if (err) {
//             console.log(err);
//             res.status(500).json({message: err});
//         } else {
//             // res.render("campgrounds/edit", {campground: campground});
//             res.status(200).json(campground);
//         }
//     })
// });

// // UPDATE ROUTE
// router.put("/:id", authenticate, function(req, res) {
//     Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, newCampground) {
//         if (err) {
//             // res.redirect("/campgrounds");
//             res.status(500).json({message: err});
//         } else {
//             // res.redirect("/campgrounds/" + req.params.id);
//             res.status(200).json(newCampground);
//         }
//     });
// });

// // DELETE ROUTE
// router.delete("/:id", authenticate, function(req, res) {
//     Campground.findById(req.params.id, function(err, campground) {
//         if (err) {
//             // res.redirect("/campgrounds");
//             res.status(500).json({message: err});
//         } else {
//             campground.remove();
//             // req.flash("success", "Campground deleted");
//             // res.redirect("/campgrounds");
//             res.status(200).json(campground);
//         }
//     })
// });

module.exports = router;