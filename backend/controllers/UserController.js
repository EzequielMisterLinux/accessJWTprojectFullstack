import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();


const GetUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const getUser = await UserModel.findById(id);
        res.status(200).json(getUser);
        console.log("get user by id success");
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error("has problem in the server", error);
    }
};




const GetUsers = async (req, res) => {
    try {
        const getUser = await UserModel.find();
        res.status(200).json(getUser);
        console.log("get users success");
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error("has problem in the server", error);
    }
};

const CreateNewUser = async (req, res) => {
    const { name, middlename, mail, username, passw } = req.body;
    try {
        const hashpasw = await bcrypt.hash(passw, 10); 
        const NewUserAdd = new UserModel({ name, middlename, mail, username, passw: hashpasw });
        await NewUserAdd.save();
        
        
        const token = jwt.sign({ id: NewUserAdd._id, username: NewUserAdd.username }, process.env.SECRET_KEY, { expiresIn: '7d' });
        
        res.status(201).json({ token });
        console.log("add user is successfully");
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error("has problem occurred in the server", error);
    }
};



const UpdateUserById = async (req, res) => {
    const { name, middlename, mail, username, passw } = req.body;
    const id = req.params.id;
    try {
        const updateUser = await UserModel.findByIdAndUpdate(id, { name, middlename, mail, username, passw }, { new: true });
        res.status(200).json(updateUser);
        console.log("user update is success");
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error("has problem occurred in the server", error);
    }
};

const UpdatePassw = async (req, res) => {
    const { passw, mail } = req.body;
    try {
        const updateUser = await UserModel.findOneAndUpdate({ mail }, { passw }, { new: true });
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(updateUser);
        console.log("User password update is successful");
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error("A problem occurred in the server", error);
    }
};




const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const SendResetPasswordEmail = async (req, res) => {
    const { mail } = req.body;
    try {
        const user = await UserModel.findOne({ mail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();

        const resetLink = `http://localhost:5173/reset-password/${token}`;
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.mail,
            subject: "Password Reset",
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                   Please click on the following link, or paste this into your browser to complete the process:\n\n
                   ${resetLink}\n\n
                   If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ message: "Error sending email" });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ message: "Email sent successfully" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error("Server error", error);
    }
};

const VerifyResetTokenAndUpdatePassword = async (req, res) => {
    const { token, passw } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await UserModel.findById(decoded.id);
        if (!user || user.resetPasswordToken !== token || user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const hashpasw = await bcrypt.hash(passw, 10);
        user.passw = hashpasw;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error("Server error", error);
    }
};





const AccessLogin = async (req, res) => {
    const { username, passw } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }


        const isMatch = await bcrypt.compare(passw, user.passw);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '7d' });
        res.json({ token });
        console.log("User logged in successfully");
    } catch (error) {
        res.status(500).send('Server error');
        console.error("Error in the server", error);
    }
};

export {
    CreateNewUser,
    GetUserById,
    GetUsers,
    UpdateUserById,
    AccessLogin,
    UpdatePassw,
    SendResetPasswordEmail,
    VerifyResetTokenAndUpdatePassword
};
