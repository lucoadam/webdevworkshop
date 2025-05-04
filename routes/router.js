const express = require('express');
const path = require('path');
let router = express.Router();
let Post = require('./../models/Post');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});
const upload = multer({
    storage:storage
}).single('avatar');
router.post('/profile', function (req, res,next) {
    upload(req,res,(err)=>{
        if(err){
            res.send(err);
        }else{
            console.log(req.file);
        }
    });
    res.send('test');
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were an
});
router.get("/", function(request, response) {
    response.redirect("/post");
})
//home route
router.get('/post',function(request,response){
    let query={}
    if('q' in request.query){
       query={
            title: {
                $regex: new RegExp(request.query.q)
            }
        }
    }   
    Post.find(query,function(err,posts){
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

//edit post route
router.get('/post/:id/edit',function(request,response){
    Post.findById(request.params['id'],function(err,post){
        if(err){
            console.log(err);
        }else{
            response.render('addPost',{
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
});

//update post
router.post('/updatePost/:id',function(request,response){
    Post.findById(request.params['id'],function(err,post){
        if(err){
            console.log(err);
        }else{
            post.title= request.body.title;
            post.description = request.body.description;
            post.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log('Post updated')
                    response.redirect('/');
                }
            });
        }
    });
});
//delete post
router.get('/post/:id/delete',function(request,response){
    Post.remove({_id:request.params['id']},function(err){
        if(err){
            console.log(err);
        }else{
            response.redirect('/');
        }
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
