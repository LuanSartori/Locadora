import controller from '../controllers/osController.js';
import express from 'express';
const router = express.Router();

router.get('/', controller.listarOs);
router.post('/add', controller.criarOs);
router.post('/update', controller.atualizarOs);
router.get('/delete', controller.deletarOs);

export default router;