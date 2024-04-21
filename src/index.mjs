import express from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(201).send({ msg: "Hello" });
});

app.get('/api/users', (req, res) => {
    res.send([{ id: 1, username: "mahi", displayname: "Mahendran" }, { id: 2, username: "kumi", displayname: "Mahendran" }, { id: 3, username: "kai", displayname: "Mahendran" }, { id: 4, username: "pant", displayname: "Mahendran" }])
})

app.get('/api/products', (req, res) => {
    res.send([{ id: 1, username: "mahi", displayname: "Mahendran" }, { id: 2, username: "kumi", displayname: "Mahendran" }, { id: 3, username: "kai", displayname: "Mahendran" }, { id: 4, username: "pant", displayname: "Mahendran" }])
})

app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`)
}) 