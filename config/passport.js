import passport from "passport";
import passportLocal from "passport-local"
import userModel from "../models/userModel.js";
const LocalStrategy = passportLocal.Strategy
import bcrypt from 'bcrypt'

export default () => {
    passport.use("local", new LocalStrategy({
        usernameField: 'email', 
        passwordField: 'password',
        session: true,
    }, async function(email, password, done){
        try {
            const user = await userModel.getUserByEmail(email);
            if (!user || user.length < 1)
                return done(null, false);
            bcrypt.compare(password, user[0].password, (err, result) => {
                console.log(passport)
                if (result==false) {
                    return done(null, false)
                }
                return done(null, user)
            })
         }catch(err) {
             return done(err)
         }
    }))
}