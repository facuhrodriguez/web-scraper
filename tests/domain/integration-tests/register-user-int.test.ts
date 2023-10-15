import { AppContainer } from '@/application/app';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ApplicationInterface, HttpException, StartProjectInit } from '@tsclean/core';
import { validUser } from '../mocks/user-repository.mock';
import { User } from '@/domain/models';

describe('Integration test: /api/v1/users/register', () => {
    let mongod: MongoMemoryServer;
    let app: ApplicationInterface;
    const userValid: User = validUser;
    beforeAll(async () => {
        app = await StartProjectInit.create(AppContainer);
        mongod = await MongoMemoryServer.create();
    })
    afterAll(async () => {
        await mongod.stop()
    })

    test('should register new user', async () => {
        const response = await request(app).post('/api/v1/users/register').send(userValid)
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('userName');
        expect(response.body.userName).toEqual(userValid.userName);
        expect(response.body).toHaveProperty('password');
    }, 50000)

    test('should throw an error if the user already exists', async () => {
        const response = await request(app).post('/api/v1/users/register').send(userValid)
        expect(response.status).toBe(404);
        expect(response.body).toEqual(new HttpException(`User already exist with the userName ${userValid.userName}`, 400));
    }, 50000)

    // test('should throw an error if the password is invalid', async () => {
    //     const response = await request(app).post('/api/v1/users/register').send(userValid)
    //     expect(response.status).toBe(404);
    //     expect(response.body).toEqual(new HttpException(`User already exist with the userName ${userValid.userName}`, 400));
    // })

    // test('should throw an error if the username is invalid', async () => {
    //     const response = await request(app).post('/api/v1/users/register').send(userValid)
    //     expect(response.status).toBe(404);
    //     expect(response.body).toEqual(new HttpException(`User already exist with the userName ${userValid.userName}`, 400));
    // })

})