import mongoose from "mongoose"
var Schema = mongoose.Schema;

var CommentSchema=new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Title: {type: String, required: true},
    Body: {type: String, required: true},
    PostDate: {type: Date, default: Date.now},
    UserId: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true},
    MovieId: {type: mongoose.Schema.Types.ObjectId, ref: "Movie", required: true},
    Rating: {type: Number, default: 0}
});

export default  mongoose.model('Review', CommentSchema);