import { mockUsers } from './constants.mjs'

export const resolveIndexByUserId = (req, res, next) => {
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

export const middleWare = (req, res, next) => {
    console.log("This is a middleware");
    console.log(`Method: ${req.method} Url: ${req.url}`);
    next();
}