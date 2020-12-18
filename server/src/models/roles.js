import mongoose from "mongoose"
const Schema = mongoose.Schema;

const UserRoleSchema=new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    RoleName: {type: String, required: true},
    AddContent: {type: Boolean, default: false},
    ModifyContent: {type: Boolean, default: false},
    
});

export default mongoose.model('Roles', UserRoleSchema);