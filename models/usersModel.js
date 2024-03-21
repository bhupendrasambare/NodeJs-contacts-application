const mongoose = require("mongoose")

const usersSchema = mongoose.Schema({
    password:{
        type:String,
        required:[true, "Please add password"]
    },
    firstName:{
        type:String,
        required:[true, "Please add contact firstName"]
    },
    lastName:{
        type:String,
        required:[true, "Please add contact lastName"]
    },
    email:{
        type:String,
        unique:true,
        required:[true, "Please add contact email"]
    },
    userName:{
        type:String,
        unique:true,
        required:[true, "Please add contact email"]
    },
    phone:{
        type:String,
        required:[true, "Please add contact phone"]
    }
},{
    timestamps:true
}
)

module.exports = mongoose.model("Users",usersSchema);

