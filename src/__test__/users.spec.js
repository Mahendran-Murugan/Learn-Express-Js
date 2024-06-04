import { getUserByIndexHandler } from '../handlers/userHandlers.mjs'
import { mockUsers } from '../utils/constants.mjs';

const mockReq = {
    findUserIndex: 1,
}

const mockRes = {
    send: jest.fn(),
    sendStatus: jest.fn(),
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