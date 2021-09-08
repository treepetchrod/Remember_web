const mongoose = require("mongoose");

const PostsSchema = new mongoose.Schema({
    username: {
        type: String,
        require:true,
    },
    title: {
        type: String,
        default:""
    },
    desc: {
        type: String,
        default:"",
    },
    photo: {
        type: String,
        default:""
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("Posts",PostsSchema)

