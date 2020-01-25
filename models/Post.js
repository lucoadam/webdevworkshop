let mongoose = require('mongoose')

let postSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    }
});

module.exports= mongoose.model('Post',postSchema);