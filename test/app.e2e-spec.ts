import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthGuard } from '@nestjs/passport';

describe('Tasks (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard('jwt')) // Sobrescribimos el guard
      .useValue({
        canActivate: (context) => {
          const request = context.switchToHttp().getRequest();
          // Simulamos un usuario autenticado
          request.user = {
            userId: 'test-user-123',
            email: 'test@example.com',
          };
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/tasks (POST)', () => {
    it('should create a task when authenticated', () => {
      return request(app.getHttpServer())
        .post('/tasks')
        .send({
          title: 'E2E Test Task',
          description: 'Testing E2E flow',
          status: 'pending',
        })
        .expect(201)
        .then((response) => {
          expect(response.body).toHaveProperty('_id');
          expect(response.body.title).toBe('E2E Test Task');
          expect(response.body.userId).toBe('test-user-123');
        });
    });
  });

  describe('/tasks (GET)', () => {
    it('should return tasks for authenticated user', () => {
      return request(app.getHttpServer())
        .get('/tasks')
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
        });
    });
  });
});
