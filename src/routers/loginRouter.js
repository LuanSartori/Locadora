import controller from '../controllers/loginController.js';
import express from 'express';
const router = express.Router();


router.get('/', controller.login);
router.post('/', controller.logar);


export default router;