import passport from "passport";
import { Strategy } from 'passport-local'
import { mockUsers } from "../utils/constants.mjs";
import { User } from "../mongoose/shema/user.mjs";
import { comparePassword } from "../utils/helper.mjs";

passport.serializeUser((user, done) => {
    console.log("Inside Serialize local User");
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    console.log("Inside Deserialize local User");
    console.log(`Deserialize User id: ${id}`);
    try {
        const findUser = await User.findById(id);
        if (!findUser) throw new Error("User not Found");
        done(null, findUser);
    } catch (e) {
        done(e, null);
    }
})

passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const findUser = await User.findOne({ username: username });
            if (!findUser) throw new Error("User not Found");
            if (!comparePassword(password, findUser.password)) throw new Error("Passsword not Match");
            done(null, findUser);
        } catch (e) {
            done(e, null);
        }
    })
)

export default passport;