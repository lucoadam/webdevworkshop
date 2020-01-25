const express = require('express');
let router = express.Router();
let Post = require('./../models/Post');

//home route
router.get('/',function(request,response){
    Post.find({},function(err,posts){
        if(err){
            console.log(err);
        }else{
            response.render("index",{
                title: "Home Page",
                description:"Some decription",
                posts : posts
            });
        }
    });
    
});

//create post
router.get('/post/create',function(request,response){
    response.render("addPost");
})

//display each post
router.get('/post/:id',function(request,response){
    Post.findById(request.params['id'],function(err,post){
        if(err){
            console.log(err);
        }else{
            response.render('displayPost',{
                post:post
            });
        }
    });
});

//submit Post
router.post('/submitPost',function(request,response){
    let post= new Post(request.body);
    post.save(function(err){
        if(err){
            console.log('cannot save post');
            console.log(err);
        }else{
            console.log('Post saved successfully')
            response.redirect('/')
        }
    });
})

//Home route
router.get('/blog',function(request,response){
    response.render("index",{
        title: "Blog Page",
        description:"This is blog page."
    });
});

module.exports = router;