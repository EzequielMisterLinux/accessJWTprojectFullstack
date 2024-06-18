import { 
  AccessLogin,
  CreateNewUser,
  GetUserById,
  GetUsers,
  UpdateUserById,
  UpdatePassw,
  SendResetPasswordEmail,
  VerifyResetTokenAndUpdatePassword
} from "../controllers/UserController.js";
import express from 'express';
import verifyToken from "../middleware/middleware.js";

const rutas = express.Router();

/* End points */
rutas.post('/userregister', CreateNewUser);
rutas.get('/users/:id', verifyToken, GetUserById);
rutas.get('/users', verifyToken, GetUsers);
rutas.put('/users/:id', verifyToken, UpdateUserById);
rutas.post('/login', AccessLogin);
rutas.put('/loginpassw', verifyToken, UpdatePassw);
rutas.put('/verifyresetpassw', VerifyResetTokenAndUpdatePassword);
rutas.post('/send-reset-password-email', SendResetPasswordEmail);
rutas.get('/protected', verifyToken, (req, res) => {
  res.send(`Hola ${req.user.username}, esta es una ruta protegida.`);
});

export default rutas;
