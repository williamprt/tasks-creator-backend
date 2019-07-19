const mongoose = require('mongoose');
const url = require('../src/url');

describe('Create new task', () => {
    beforeAll(() => {
        mongoose.connect(url.mongoDB, {
            useNewUrlParser: true,
        })
    });
    beforeEach(() => {
        jest.setTimeout(10000)
    });
    test('if task will be created', () => {
        const { routes } = require('../src/routes');
        expect(routes).toBe(status(200));
    });
    afterAll(() => {
        return mongoose.disconnect();
    })
})