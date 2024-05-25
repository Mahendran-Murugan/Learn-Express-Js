import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.mjs'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport';
import mongoose from 'mongoose';

dotenv.config();

const PORT = process.env.PORT || 7000;

const app = express();

mongoose.connect('mongodb://localhost:27017/express')
    .then(() => console.log("MongoDB Connected Sucessfully"))
    .catch((e) => console.log("MongoDB Connection Failed " + e))

app.use(express.json());

app.use(cors({ origin: "*" }));

app.use(cookieParser("hello"));

app.use(session({
    secret: "mahendran",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient(),

    })
}));

app.use(passport.initialize());

app.use(passport.session());

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is Running at http://localhost:${PORT}`)
})

app.get('/', (req, res, next) => {
    console.log("Base Middleware");
    next();
}, (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie('hello', 'user',
        { maxAge: 10000, signed: true }
    )
    res.status(201).send(
        { msg: "Hello" }
    );
});


