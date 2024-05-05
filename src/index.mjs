import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { query, validationResult, body, matchedData, checkSchema } from 'express-validator'
import { createUserSchema } from './utils/createUserSchema.mjs'

dotenv.config();

const PORT = process.env.PORT || 7000;

const app = express();

app.use(express.json());

// app.use(middleWare);

app.use(cors({ origin: "*" }));

const mockUsers = [
    { id: 1, username: "mahi", displayname: "Mahendran" },
    { id: 2, username: "kumi", displayname: "Mahendran" },
    { id: 3, username: "kai", displayname: "Mahendran" },
    { id: 4, username: "pant", displayname: "Mahendran" },
];

const middleWare = (req, res, next) => {
    console.log("This is a middleware");
    console.log(`Method: ${req.method} Url: ${req.url}`);
    next();
}

const resolveIndexByUserId = (req, res, next) => {
    const {
        params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => {
        return user.id === parsedId
    })
    if (findUserIndex === -1) return res.sendStatus(400);
    req.findUserIndex = findUserIndex;
    req.id = parsedId;
    console.log(findUserIndex);
    next();
}

app.get('/', (req, res, next) => {
    console.log("Base Middleware");
    next();
}, (req, res) => {
    res.status(201).send({ msg: "Hello" });
});

app.get('/api/products', middleWare, (req, res) => {
    res.send([{ id: 1, username: "mahi", displayname: "Mahendran" }, { id: 2, username: "kumi", displayname: "Mahendran" }, { id: 3, username: "kai", displayname: "Mahendran" }, { id: 4, username: "pant", displayname: "Mahendran" }])
})

app.post('/api/users',
    // body("username").notEmpty().withMessage("Username Can't be null").isString().withMessage("Username can't be numerics"),
    checkSchema(createUserSchema),
    (req, res) => {
        const result = validationResult(req);
        console.log(result);
        if (!result.isEmpty()) return res.status(400).send({ errors: result.array() });
        const data = matchedData(req);
        const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data }
        mockUsers.push(newUser);
        res.status(200).send(newUser);
    })

app.get('/api/users', query('filter').isString().notEmpty().isLength({ min: 1, max: 10 }).withMessage("Messeage should be in range of 1 to 10"), (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const { query: { filter, value } } = req;
    if (filter && value) return res.send(
        mockUsers.filter((user) => {
            return user[filter].includes(value)
        })
    );
    return res.send(mockUsers);
    // //not work
    // if (filter && value) return res.send(
    //     mockUsers.filter((user) => {
    //         user[filter].includes(value) // need to retrun if we use {}
    //     })
    // );
})

app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`)
})

app.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    return res.send(mockUsers[findUserIndex]);
});

app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex, id } = req;
    mockUsers[findUserIndex] = { id: id, ...body }
    return res.sendStatus(200);
})

app.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return res.sendStatus(200);
})


app.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
    mockUsers.splice(req.findUserIndex, 1);
    return res.sendStatus(200);
})