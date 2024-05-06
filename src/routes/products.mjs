import { Router } from 'express'
import { middleWare } from '../utils/middlewares.mjs'

const router = Router();

router.get('/', middleWare, (req, res) => {
    res.send(
        [
            { id: 1, username: "mahi", displayname: "Mahendran" },
            { id: 2, username: "kumi", displayname: "Mahendran" },
            { id: 3, username: "kai", displayname: "Mahendran" },
            { id: 4, username: "pant", displayname: "Mahendran" }
        ]
    )
})

export default router;