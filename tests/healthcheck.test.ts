import request from 'supertest';
import app from '../src';

describe('Server Health Check', () => {
    it('should respond with status 200 and message "pong"', async () => {
        const response = await request(app).get('/healthcheck/ping');

        expect(response.status).toBe(200);
        return expect(response.body.message).toBe('pong');
    });
});
