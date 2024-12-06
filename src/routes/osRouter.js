import controller from '../controllers/osController.js';
import express from 'express';
const router = express.Router();

router.get('/', controller.listarOs);
router.get('/buscar_um', controller.buscarOrdem);
router.post('/add', controller.criarOs);
router.post('/update/:id', controller.atualizarOs);
router.get('/delete/:id', controller.deletarOs);

export default router;