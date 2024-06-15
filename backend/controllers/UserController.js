import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken"


const GetUserById = async(req, res) => {
    const id = req.params.id
    try {
        const getUser = await UserModel.findById(id)
        res.status(200).json(getUser)
        console.log("get user by id success");
    } catch (error) {
        console.error("has problem in the server", error);
    }
}

const GetUsers = async(req, res) => {
    
    try {
        const getUser = await UserModel.find()
        res.status(200).json(getUser)
        console.log("get users success");
    } catch (error) {
        console.error("has problem in the server", error);
    }
}

const CreateNewUser = async(req, res) => {

    const {name, middlename, mail, username, passw} = req.body

    try {
        
        const NewUserAdd = await UserModel({name, middlename, mail, username, passw})
        NewUserAdd.save()
        res.status(201).json(NewUserAdd)

        console.log("add user is successfully");
    } catch (error) {

        console.error("has problem ocurred in the server", error);
    }
}


const UpdateUserById = async(req, res) => {

    const {name, middlename, mail, username, passw} = req.body
    const id = req.params.id

    try {
        const updateUser = await UserModel.findByIdAndUpdate(id , {name, middlename, mail, username, passw}, {new:true})
        res.status(200).json(updateUser)
        console.log("user update is success");
    } catch (error) {
        console.error("has problem ocurred in ther server", error);
    }
}

const UpdatePassw = async(req, res) => {

    const {passw} = req.body
    const id = req.params.id

    try {
        const updateUser = await UserModel.findByIdAndUpdate(id , {passw}, {new:true})
        res.status(200).json(updateUser)
        console.log("user passw update is success");
    } catch (error) {
        console.error("has problem ocurred in ther server", error);
    }
}

  
const AccessLogin = async(req, res) => {
    const {username, passw} = req.body

    try {
        const user = await UserModel.findOne({ username, passw });
        if (!user) {
          return res.status(401).send('Credenciales inválidas');
        }
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.SECRET_KEY, { expiresIn: '1h' });
         res.json({ token });
         console.log("login user is successfully");
      } catch (error) {
        res.status(500).send('Error en el servidor');
        console.error("problem in the server", error);
      }
}


export {
    CreateNewUser, 
    GetUserById, 
    GetUsers, 
    UpdateUserById, 
    AccessLogin,
    UpdatePassw}
