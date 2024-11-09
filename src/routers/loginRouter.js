import controller from '../controllers/loginController.js';
import passport from 'passport';
import express from 'express';
const router = express.Router();


router.get('/', controller.login);
// router.post('/login', controller.logar);
router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login?fail=true'
}))


export default router;