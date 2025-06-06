import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { faker } from '@faker-js/faker/.';

describe('EnterpriseController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/enterprise (POST)', () => {
    return request(app.getHttpServer())
      .post('/enterprise')
      .send({
        name: faker.company.name(),
        cnpj: faker.string.numeric({ length: 14 }),
        phone: faker.phone.number(),
      })
      .expect(201);
  });
});
