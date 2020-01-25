//Dependencies for file 
const express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
const mongoose = require('mongoose');
let Post = require('./models/Post')

//connection to database
mongoose.connect('mongodb://127.0.0.1:27017/mydb',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
let db= mongoose.connection;
// db.createCollection()
//Inititalizing express app 
const app  = express();

//layout and templating

app.use(bodyParser.urlencoded(
    {extended:false}
));
app.use(bodyParser.json())
//Specifies the views folder
app.set('views',path.join(__dirname,
    'views') );
app.set('view engine','ejs');


//Home route
app.get('/',function(request,response){
    console.log(Post.find())
    response.render("index",{
        title: "Home Page",
        description:"Some decription"
    });
});

//Home route
app.get('/blog',function(request,response){
    response.render("blog",{
        title: "Blog Page",
        description:"This is blog page."
    });
});
//creating a server
app.listen(8000,function(){
    console.log('Server running successfully at localhost:8000');
});