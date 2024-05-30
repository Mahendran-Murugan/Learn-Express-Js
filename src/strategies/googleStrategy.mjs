import passport from "passport";
import { Strategy } from "passport-google-oauth2";
import dotenv from 'dotenv';
import { googleUser } from "../mongoose/shema/googleUser.mjs";
dotenv.config();

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await googleUser.findById(id);
        return findUser ? done(null, findUser) : done(null, null);
    } catch (err) {
        return done(err, null)
    }
})

passport.use(
    new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/google/redirect",
        scope: ['email', 'profile'],
        passReqToCallback: true,
    }, async (request, accessToken, refreshToken, profile, done) => {
        let findUser;
        try {
            findUser = await googleUser.findOne({ id: profile.id });
        } catch (err) {
            return done(err, null);
        }
        try {
            if (!findUser) {
                const newUser = new googleUser({
                    user_id: profile.id,
                    username: profile.name.givenName,
                    displayName: profile.displayName,
                    email: profile.email,
                })
                const newSavedUser = await newUser.save();
                return done(null, newSavedUser);
            }
            return (null, findUser);
        } catch (err) {
            return done(err, null);
        }
    })
);

export default passport;