import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

const mockUsers = [{ id: 1, username: "mahi", displayname: "Mahendran" }, { id: 2, username: "kumi", displayname: "Mahendran" }, { id: 3, username: "kai", displayname: "Mahendran" }, { id: 4, username: "pant", displayname: "Mahendran" }];

app.get('/', (req, res) => {
    res.status(201).send({ msg: "Hello" });
});

app.get('/api/products', (req, res) => {
    res.send([{ id: 1, username: "mahi", displayname: "Mahendran" }, { id: 2, username: "kumi", displayname: "Mahendran" }, { id: 3, username: "kai", displayname: "Mahendran" }, { id: 4, username: "pant", displayname: "Mahendran" }])
})

app.get('/api/users', (req, res) => {
    console.log(req.query);
    const { query: { filter, value } } = req;
    if (!filter && !value) return res.send(mockUsers);
    if (filter && value) return res.send(
        mockUsers.filter((user) => {
            return user[filter].includes(value)
        })
    );
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