import bcrypt from 'bcrypt'
import asyncWrapper from "../middleware/async.js";
import { connectDB } from '../database/connect.js';
import { createCustomError } from "../errors/custom-error.js";
import {generateAccessToken, refreshAccessToken, } from '../middleware/generator-access-token.js';
import userModel from '../models/userModel.js';
import passport from 'passport'
const authController = {
    signUp: asyncWrapper (async (req, res, next) => {
    
        const {name, email, password } = req.body;
        const user = await userModel.getUserByEmail({email: email});
        if (user && user.length ) {
            return next(createCustomError('user already exists', 403))
        }
            // save new user data into db
        const hashedPassword = await bcrypt.hash(password, 12)
        
        const newUser = await userModel.createUser({name: name, email: email, password: hashedPassword});
        console.log(newUser)
        await userModel.createPermission(newUser[0])

        return res.status(201).json({
            status: 'success',
            data: newUser
        })
    }),

    signIn: asyncWrapper(async (req, res, next ) => {

        const { email, password } = req.body;
       
        if (!email || !password) 
            return next(createCustomError(`email or password is missing`, 403))

        
        passport.authenticate("local", (err, user, info) => {
            console.log(user)
            console.log(info)
            console.log(err)
            if (err) {
                return next(createCustomError(`authentication err ${err}`, 500))
            }
            // not user exist with that email
            
            if (!user.length) 
                return next(createCustomError('incorrect email or password', 401))
            
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) 
                    return next(createCustomError(err, 500))
                else if (result == false) 
                    return next(createCustomError('incorrect email or passwords', 401))
                else {
                    const token = generateAccessToken(email)
                    const refreshToken = refreshAccessToken(email)
                    req.session.token = refreshToken
                    return res.status(200).json({
                        data: {
                            token: token,
                            refreshToken: refreshToken,
                            user: user
                        }
                    });
                }    
                
            })
        })(req, res); // don't forget to put req, res

    }), 
    signOut: asyncWrapper( async (req, res, next) => {
        
    }),

    getUser: asyncWrapper( async (req, res, next) => {
        
        const email = req.session.user
        const user = await userModel.getUserByEmail({email: email});
        if (!user && !user.length) {
            return next(createCustomError('user not exist', 401))
        }
        return res.status(200).json({
            status: 'success',
            data: user
        })
    }),

    verifyUser: asyncWrapper(async (req, res, next) => {
        return res.send(req.query)
    }),

    getUserById: asyncWrapper (async (req, res, next) => {
        const user_id = req.params.id;
        if (!user_id || user_id == null) {
            return next(createCustomError(`user id not provided`, 401))
        }
        
        const userDetail = await userModel.getUserById(user_id)

        if (!userDetail) {
            return next(createCustomError(`user not found with provided id`, 404))
        }
        console.log(userDetail)
        return res.status(200).json({
            status: 'success',
            data: userDetail
        })
    }),

    editUser: asyncWrapper(async (req, res) => {
       
    }),

    deleteUser: asyncWrapper(async (req, res, next ) => {
        const email = req.session.user;
        const deletedUser = await userModel.deleteUser({email: email})
        console.log(deletedUser)
        if (!deletedUser && !deletedUser.length) {
            return next(createCustomError(`No user exists with provided username`, 404))
        }
        return res.status(200).json({
            status: 'success',
            msg: `user deleted with ${email}`
        })
    }),

    updatePassword: asyncWrapper(async(req, res, next) => {

        const password = req.body.password
        const email = req.session.user;

        if (!email || !password) 
            return next(createCustomError(`email or password is missing`), 403)

        const hashedPassword = await bcrypt.hash(password, 12)
        const updatedUser = await connectDB('user').update({password: hashedPassword}).where('email', email);
        if (!updatedUser)
            return next(createCustomError('interval server error', 500))

        return res.status(200).json({
            status: 'success',
            msg: `user's password updated with ${email}`
        })
        
    }),

    refreshToken: asyncWrapper(async (req, res, next) => {
        const refreshToken = req.body.token;
        if (refreshToken == null) 
            return next(createCustomError('No token provided', 401))
        console.log(req.session.token)
        console.log(refreshToken)
        if (req.session.token != refreshToken) 
            return next(createCustomError('No token with provided refreshToken', 403))

        const token = generateAccessToken(req.session.user)
        return res.status(200).json({ token: token})

    }),
}
export default authController;
