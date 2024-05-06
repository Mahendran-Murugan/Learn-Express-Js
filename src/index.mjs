import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.mjs'

dotenv.config();

const PORT = process.env.PORT || 7000;

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`)
})

app.get('/', (req, res, next) => {
    console.log("Base Middleware");
    next();
}, (req, res) => {
    res.status(201).send(
        { msg: "Hello" }
    );
});