import mongoose from "mongoose"
const Schema = mongoose.Schema;

const UserSchema= new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    UserName: {type: String, required: true, min: 6, max: 50},
    Password: {type:String, required: true, min: 6, max: 1024},
    Email: {type:String, required: true, min: 6, max: 255},
    Description: {type: String, required: true, min: 15, max: 500},
    RegistrationDate: {type: Date, required: true},
    UserRole: {type: mongoose.Schema.Types.ObjectId, ref: 'Roles' ,required: true},
    isBlocked: {type: Boolean, required: true},
    ProfileImage: {type: String, required: false},
    LogedIn: {type: Boolean, default: false}
});

export default mongoose.model('Users', UserSchema);