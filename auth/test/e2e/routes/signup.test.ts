import request from 'supertest';
import { app } from '../../../src/app';
import prisma from '../../../src/dabase/client';

describe('Test the signup.ts', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('returns a 201 on sucessful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        name: 'Teste da silva',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });

  it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        name: 'Teste da silva',
        email: 'invalid',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 400 with an invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        name: 'Teste da silva',
        email: 'test@test.com',
        password: 'p',
      })
      .expect(400);
  });

  it('returns a 400 with missing email and password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({})
      .expect(400);
  });

  it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Teste da silva',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Teste da silva',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  });

  it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Teste da silva',
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
