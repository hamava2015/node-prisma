import request from 'supertest';
import app from '../src/server';

describe('Server Health Check', () => {
    it('should respond with status 200 and message "pong"', async () => {
        const response = await request(app).get('/healthcheck/ping');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('pong');
    });
});
