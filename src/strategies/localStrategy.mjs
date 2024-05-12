import passport from "passport";
import { Strategy } from 'passport-local'
import { mockUsers } from "../utils/constants.mjs";

passport.serializeUser((user, done) => {
    console.log("Inside Serialize User");
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    console.log("Inside Deserialize User");
    console.log(`Deserialize User id: ${id}`);
    try {
        const findUser = mockUsers.find(user => user.id === id);
        if (!findUser) throw new Error("User not Found");
        done(null, findUser);
    } catch (e) {
        done(e, null);
    }
})

passport.use(
    new Strategy((username, password, done) => {
        try {
            console.log(username + " " + password);
            const findUser = mockUsers.find(user => user.username === username);
            if (!findUser) throw new Error("User not Found");
            if (findUser.password !== password) throw new Error("Password Mismatch");
            done(null, findUser);
        } catch (e) {
            done(e, null);
        }
    })
)

export default passport;