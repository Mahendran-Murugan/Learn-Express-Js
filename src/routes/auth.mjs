import { mockUsers } from '../utils/constants.mjs'
import { Router } from 'express'

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

export default router;