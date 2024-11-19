import controller from '../controllers/veiculosController.js';
import express from 'express';
const router = express.Router();


router.get('/', controller.listar);
router.post('/add', controller.cadastrar);
router.get('/delete/:placa', controller.deletar);
router.get('/update/:placa', controller.editar);
router.post('/update/:placa', controller.atualizar);


export default router;