import { Router } from 'express'
import { checkSchema, validationResult, matchedData, query } from 'express-validator'
import { createUserSchema } from '../utils/createUserSchema.mjs'
import { mockUsers } from '../utils/constants.mjs'
import { resolveIndexByUserId } from '../utils/middlewares.mjs'

const router = Router();

router.post('/api/users',
    checkSchema(createUserSchema),
    (req, res) => {
        const result = validationResult(req);
        console.log(result);
        if (!result.isEmpty()) return res.status(400).send({ errors: result.array() });
        const data = matchedData(req);
        const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data }
        mockUsers.push(newUser);
        res.status(200).send(newUser);
    }
)

router.get('/api/users', query('filter').isString().notEmpty().isLength({ min: 1, max: 10 }).withMessage("Messeage should be in range of 1 to 10"), (req, res) => {
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

router.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    return res.send(mockUsers[findUserIndex]);
});

router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex, id } = req;
    mockUsers[findUserIndex] = { id: id, ...body }
    return res.sendStatus(200);
})

router.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return res.sendStatus(200);
})

router.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
    mockUsers.splice(req.findUserIndex, 1);
    return res.sendStatus(200);
})

export default router;