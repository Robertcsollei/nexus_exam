import mongoose from "mongoose"
var Schema = mongoose.Schema;

var CategorySchema=new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Name: {type: String, required: true}
   
});

export default mongoose.model('Category', CategorySchema);