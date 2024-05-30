import passport from "passport";
import { Strategy } from "passport-google-oauth2";
import dotenv from 'dotenv';
dotenv.config();

passport.use(
    new Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api/auth/google/redirect",
        scope: ['email', 'profile'],
        passReqToCallback: true,
    }, (request, accessToken, refreshToken, profile, done) => {
        console.log(profile);
        return done(err, profile);
    })
);

export default passport;