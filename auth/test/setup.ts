import prisma from '../src/dabase/client';

beforeAll(async () => {
  // setup database
});

beforeEach(async () => {
  // clean database
});

afterAll(async () => {
  await prisma.$disconnect();
});
