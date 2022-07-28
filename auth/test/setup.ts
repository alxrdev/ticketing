import request from 'supertest';
import { app } from '../src/app';
import prisma from '../src/dabase/client';

declare global {
  var signin: () => Promise<string[]>;
}

beforeAll(async () => {
  // setup database
});

beforeEach(async () => {
  // clean database
});

afterAll(async () => {
  await prisma.$disconnect();
});

global.signin = async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      name: 'Test da Silva',
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
