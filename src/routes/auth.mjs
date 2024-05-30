import { mockUsers } from '../utils/constants.mjs'
import { Router } from 'express'
import passport from 'passport';
import '../strategies/localStrategy.mjs'
import '../strategies/googleStrategy.mjs'

const router = Router();

router.post('/', (req, res) => {
    const {
        body: { username, password }
    } = req;

    const findUser = mockUsers.find(user => user.username === username);

    if (!findUser || findUser.password !== password) return res.status(401).send({ error: "Error in Credentials" });

    req.session.user = findUser;

    res.status(200).send(findUser);
})

router.get('/status', (req, res) => {
    req.sessionStore.get(req.session.id, (err, session) => {
        console.log(session);
    });
    return req.session.user ? res.status(200).send({ "status": req.session.user }) : res.status(400).send({ status: "Not Authorized" })
})
router.post('/pass-auth', passport.authenticate("local"), (req, res) => {
    return res.sendStatus(200);
})

router.get('/pass-status', (req, res) => {
    console.log(req.user);
    console.log(req.session);
    if (!req.user) return res.sendStatus(401);
    return res.status(200).send(req.user);
})

router.post('/pass-logout', (req, res) => {
    if (!req.user) res.sendStatus(401);
    req.logOut((err) => {
        if (err) return res.sendStatus(401);
        return res.sendStatus(200);
    })
})

router.get('/google', passport.authenticate('google'));

router.get('/google/redirect', (req, res) => {
    res.send({ Working: "Working" })
});

export default router;