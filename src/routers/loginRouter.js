import controller, {verificaLogin} from '../controllers/loginController.js';
import express from 'express';
const router = express.Router();


router.get('/', verificaLogin, controller.login);
router.post('/', verificaLogin, controller.logar);


export default router;