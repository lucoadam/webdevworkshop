const express = require('express');
let router = express.Router();

//home route
router.get('/',function(request,response){
    response.render("index",{
        title: "Home Page",
        description:"Some decription"
    });
});

//Home route
router.get('/blog',function(request,response){
    response.render("index",{
        title: "Blog Page",
        description:"This is blog page."
    });
});

module.exports = router;