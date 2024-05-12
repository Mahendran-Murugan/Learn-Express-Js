import { Router } from 'express'
import { middleWare } from '../utils/middlewares.mjs'

const router = Router();

router.get('/', middleWare, (req, res) => {
    console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies);
    if (req.signedCookies.hello && req.signedCookies.hello === "user")
        res.send(
            [
                { id: 1, username: "mahi", displayname: "Mahendran" },
                { id: 2, username: "kumi", displayname: "Mahendran" },
                { id: 3, username: "kai", displayname: "Mahendran" },
                { id: 4, username: "pant", displayname: "Mahendran" }
            ]
        )
    else
        res.status(404).send({ message: "You don't have the cookies" })
})

router.post('/cart', (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    const { body: { item }, session: { cart } } = req;
    if (cart) {
        cart.push(item)
    }
    else {
        req.session.cart = [item];
    }
    return res.status(201).send({ item: item });
})

router.get('/cart', (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    const { session: { cart } } = req;
    return res.status(201).send({ item: cart });
})

export default router;