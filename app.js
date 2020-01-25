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

//checking database connection
db.once('open',function(){
    console.log("Connection to MongoDB database successful")
});
//error on database connection
db.on('error',function(err){
    console.log(err);
});

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


//route
app.use('/',require('./routes/router'));

//creating a server
app.listen(8000,function(){
    console.log('Server running successfully at localhost:8000');
});