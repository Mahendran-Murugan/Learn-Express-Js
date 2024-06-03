import { getUserByIndexHandler } from '../handlers/userHandlers.mjs'

const mockReq = {
    findUserIndex: 1,
}

const mockRes = {
    send: jest.fn(),
    sendStatus: jest.fn(),
}

describe('get users', () => {
    it('get user by id', () => {
        getUserByIndexHandler(mockReq, mockRes);
    });
});