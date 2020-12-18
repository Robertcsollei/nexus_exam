import mongoose from "mongoose"
const Schema = mongoose.Schema;

const QuestionSchema=new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Title: {type: String, required: true},
    Body: {type: String, required: true},
    Tags: [{type: String, required: false}],
    YearOfRelease: {type: String, required: true},
    Categoryid: {type: mongoose.Schema.Types.ObjectId, ref: 'Category' ,required: true},
    MovieImage: [{type: String, required: false}],
    Reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review", required: false}],
    Rating: {type: Number, required: true}
});

export default mongoose.model('Movie', QuestionSchema);