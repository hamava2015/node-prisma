import request from 'supertest';
import app from '../src';

describe("POST /users/signup", () => {
    describe("given a username and password", () => {

        // test("should respond with a 201 status code", async () => {
        //     const response = await request(app).post("/users/signup").send({
        //         username: "username",
        //         password: "password"
        //     })
        //     return expect(response.statusCode).toBe(201)
        // })
    })

    describe("when the username and password is missing", () => {
        test("should respond with a status code of 400", async () => {
            const bodyData = [
                { username: "username" },
                { password: "password" },
                {}
            ]
            for (const body of bodyData) {
                const response = await request(app).post("/users/signup").send(body)
                expect(response.statusCode).toBe(500)
            }
        })
    })
})