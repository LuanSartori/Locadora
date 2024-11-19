import controller from '../controllers/clientesController.js';
import express from 'express';
const router = express.Router();


router.get('/', controller.listar);
router.post('/add', controller.cadastrar);
router.get('/delete/:id', controller.deletar);
router.get('/update/:id', controller.editar);
router.post('/update/:id', controller.atualizar);


export default router;