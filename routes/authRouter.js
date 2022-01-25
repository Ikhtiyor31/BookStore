import express from "express";
import  authController from "../controllers/authController.js"
import authenticateToken from "../middleware/verify-access-token.js";
import { check, validationResult } from "express-validator";
const router = express.Router()


router.route('/signup')
    .post([ 
        check('email').trim().escape(),
        check('password').trim().isLength().trim().escape(),
        ],authController.signUp) 

router.route('/signin')
    .post(authController.signIn) 

router.route('/signout')
    .post(authController.signOut)
    
router.route('/user/verify')
    .get(authController.verifyUser)    
    
router.route('/user/:id')
    .get(authController.getUserById)

router.route('/token')
    .post(authController.refreshToken)

router.route('/profile')
    .get(authenticateToken, authController.getUser)
    .patch(authenticateToken, authController.editUser)
    .delete(authenticateToken, authController.deleteUser)
 
    

router.route('/password')
    .patch(authenticateToken, authController.updatePassword)    

export default router