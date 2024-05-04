import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));

const PORT = process.env.PORT || 7000;

const mockUsers = [{ id: 1, username: "mahi", displayname: "Mahendran" }, { id: 2, username: "kumi", displayname: "Mahendran" }, { id: 3, username: "kai", displayname: "Mahendran" }, { id: 4, username: "pant", displayname: "Mahendran" }];

app.get('/', (req, res) => {
    res.status(201).send({ msg: "Hello" });
});

app.get('/api/products', (req, res) => {
    res.send([{ id: 1, username: "mahi", displayname: "Mahendran" }, { id: 2, username: "kumi", displayname: "Mahendran" }, { id: 3, username: "kai", displayname: "Mahendran" }, { id: 4, username: "pant", displayname: "Mahendran" }])
})

app.post('/api/users', (req, res) => {
    console.log(req.body);
    const { body } = req;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, username: body.username, displayname: body.displayname }
    mockUsers.push(newUser);
    res.sendStatus(200);
})

app.get('/api/users', (req, res) => {
    console.log(req.query);
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

app.get('/api/users/:id', (req, res) => {
    let { params: { id } } = req;
    id = parseInt(id);
    if (isNaN(id)) return res.send(400);
    const findUser = mockUsers.find((user) => user.id == id)
    if (findUser == -1) return res.send(404);
    return res.send(findUser);
});

app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`)
})


app.put("/api/users/:id", (req, res) => {
    const { body,
        params: { id },
    } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => {
        return user.id === parsedId
    })
    if (findUserIndex === -1) return res.sendStatus(400);
    mockUsers[findUserIndex] = { id: parsedId, ...body }
    return res.sendStatus(200);
})

app.patch('/api/users/:id', (req, res) => {
    const { body, params: { id } } = req;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return res.sendStatus(404);
    const findUserIndex = mockUsers.findIndex((user) => {
        return user.id === parsedId;
    })
    console.log(findUserIndex);
    if (findUserIndex === -1) return res.sendStatus(404);
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return res.sendStatus(200);
})


app.delete('/api/users/:id', (req, res) => {
    let { params: { id } } = req;
    id = parseInt(id);
    if (isNaN(id)) return res.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id == id);
    if (findUserIndex != -1) {
        mockUsers.splice(findUserIndex, 1);
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
})