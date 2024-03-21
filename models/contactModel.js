const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true],
        ref:"Users"
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

module.exports = mongoose.model("Contact",contactSchema);

