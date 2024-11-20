import { Router } from "express";
import controllerDoctor from "./controllers/controller.doctor.js";
import controllerUser from "./controllers/controller.user.js";

const router = Router();

// Doctors...
router.get('/doctors', controllerDoctor.Listar);
router.post('/doctors', controllerDoctor.Inserir);
router.put('/doctors/:id_doctor', controllerDoctor.Editar);
router.delete('/doctors/:id_doctor', controllerDoctor.Excluir);

// Users...
router.post('/users/register', controllerUser.Inserir);
router.post('/users/login', controllerUser.Login);

// Appointments...

// Services...

export default router;