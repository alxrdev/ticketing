import request from 'supertest';
import { app } from '../../../src/app';
import prisma from '../../../src/dabase/client';

describe('Test the my-user.ts', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  it('responds with details about the current user', async () => {
    const cookie = await signin();

    const response = await request(app)
      .get('/api/users/my-user')
      .set('Cookie', cookie)
      .send()
      .expect(200);

    expect(response.body.currentUser.email).toEqual('test@test.com');
  });

  it('responds with null if not authenticated', async () => {
    const response = await request(app)
      .get('/api/users/my-user')
      .send()
      .expect(200);

    expect(response.body.currentUser).toEqual(null);
  });
});
