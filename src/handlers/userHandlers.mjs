import { mockUsers } from '../utils/constants.mjs';
import { validationResult, matchedData } from 'express-validator';
import { hashPassword } from '../utils/helper.mjs';
import { User } from '../mongoose/shema/user.mjs'

export const getUserByIndexHandler = (req, res) => {
    const { findUserIndex } = req;
    const findUser = mockUsers[findUserIndex];
    if (!findUser) return res.sendStatus(404);
    return res.send(findUser);
}

export const postUserHandler = async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(401).send({ error: result.array() });
    const data = matchedData(req);
    console.log(data);
    const password = hashPassword(data.password);
    const newUser = new User({
        username: data.username,
        displayName: data.displayName,
        password: password,
    });
    try {
        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    } catch (e) {
        console.log(e);
        return res.sendStatus(401);
    }
}