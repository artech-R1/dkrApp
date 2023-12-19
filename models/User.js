const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    update_at:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("User",UserSchema);