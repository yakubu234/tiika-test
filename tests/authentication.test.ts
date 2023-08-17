import request from 'supertest';
import { expect } from 'chai';
import app from '../src/index';

describe('User Authentication', () => {
  let testUsername: string;
  let testPassword: string;

  before(() => {
    // Generate dynamic test username and password
    testUsername = 'testuser_' + Math.random().toString(36).substring(7);
    testPassword = 'tes@1tpwd'+ Math.random().toString(36).substring(7);
  });

  it('should register a new user', async () => {
    const response = await request(app).post('/api/user/register').send({
      username: testUsername,
      password: testPassword,
    });

    expect(response.statusCode).to.equal(201);
    expect(response.body.user.username).to.equal(testUsername);
  });

  it('should login with registered user', async () => {
    const response = await request(app).post('/api/user/login').send({
      username: testUsername,
      password: testPassword,
    });

    expect(response.statusCode).to.equal(200);
    expect(response.body.accessToken).to.be.a('string');
  });

});
