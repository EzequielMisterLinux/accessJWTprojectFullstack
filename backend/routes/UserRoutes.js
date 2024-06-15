import { 
    AccessLogin,
    CreateNewUser , 
    GetUserById, 
    GetUsers,
    UpdateUserById
} from "../controllers/UserController.js";

import express from 'express'
import verifyToken from "../middleware/middleware.js";

const rutas = express.Router()

/*end points */


rutas.post('/users', CreateNewUser)
rutas.get('/users/:id', GetUserById)
rutas.get('/users', GetUsers)
rutas.put('/users/:id', UpdateUserById)
rutas.post('/login', AccessLogin)





rutas.get('/protected', verifyToken, (req, res) => {
    res.send(`Hola ${req.user.username}, esta es una ruta protegida.`);
  });

export default rutas

