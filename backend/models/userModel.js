import mongoose from "mongoose";


const UserShema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    middlename: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    passw: {
        type: String,
        required: true,
        unique: true
    }
})


const UserModel = mongoose.model('User', UserShema)

export default UserModel