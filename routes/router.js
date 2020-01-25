const express = require('express');
let router = express.Router();

//home route
router.get('/',function(request,response){
    response.render("index",{
        title: "Home Page",
        description:"Some decription"
    });
});

//create post
router.get('/post/create',function(request,response){
    response.render("addPost");
})

//submit Post
router.post('/submitPost',function(request,response){
    console.log(request.body);
    response.send('Post Successful');
})

//Home route
router.get('/blog',function(request,response){
    response.render("index",{
        title: "Blog Page",
        description:"This is blog page."
    });
});

module.exports = router;