import mongoose from "mongoose";


const url = 'mongodb://localhost:27017/users'

const connectDB = async () => {

    try {
        await mongoose.connect(url)
        console.log("connection to mongodb is success");
    } catch (error) {
        console.error("has problem in the server");
    }
}

export default connectDB