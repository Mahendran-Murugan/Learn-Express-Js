import { getUserByIndexHandler, postUserHandler } from '../handlers/userHandlers.mjs'
import { mockUsers } from '../utils/constants.mjs';

jest.mock('express-validator', () => ({
    validationResult: jest.fn(() => ({
        isEmpty: jest.fn(() => false),
        array: jest.fn(() => [{ msg: "invalid" }])
    })),
    matchedData: jest.fn(),
}))

const mockReq = {
    findUserIndex: 1,
}

const mockRes = {
    send: jest.fn(),
    sendStatus: jest.fn(),
    status: jest.fn(() => mockRes),
}

describe('get users', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('get user by id', () => {
        getUserByIndexHandler(mockReq, mockRes);
        expect(mockRes.send).toHaveBeenCalled();
        expect(mockRes.send).toHaveBeenCalledWith(mockUsers[mockReq.findUserIndex]);
        expect(mockRes.send).toHaveBeenCalledTimes(1);
    });
    it('user is not found it 404', () => {
        const copyReq = { ...mockReq, findUserIndex: 10 };
        getUserByIndexHandler(copyReq, mockRes);
        expect(mockRes.sendStatus).toHaveBeenCalled();
        expect(mockRes.sendStatus).toHaveBeenCalledWith(404);
        expect(mockRes.sendStatus).toHaveBeenCalledTimes(1);
        expect(mockRes.send).not.toHaveBeenCalled();
    });
});

describe("post users", () => {
    const mockReq = {};
    it('for 404 status', async () => {
        await postUserHandler(mockReq, mockRes);
    })
});