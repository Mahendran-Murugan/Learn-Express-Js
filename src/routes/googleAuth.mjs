import { Router } from 'express';
import passport from 'passport'

const router = Router();

router.get('/', passport.authenticate('google'));

router.get('/redirect', passport.authenticate('google'), (req, res) => {
    res.send({ Working: "Working" })
});

export default router;