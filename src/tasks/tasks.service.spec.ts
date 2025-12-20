import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getModelToken } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let model: any;

  // Mock del Modelo de Mongoose
  const mockTaskModel = {
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getModelToken(Task.name),
          useValue: mockTaskModel,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    model = module.get(getModelToken(Task.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task successfully', async () => {
      const dto = { title: 'Test', description: 'Desc', status: 'pending' };
      const userId = 'user-123';
      const expectedTask = { ...dto, userId, _id: 'task-id' };

      mockTaskModel.create.mockResolvedValue(expectedTask);

      const result = await service.create(dto as any, userId);
      expect(result).toEqual(expectedTask);
      expect(mockTaskModel.create).toHaveBeenCalledWith({ ...dto, userId });
    });
  });

  describe('findAll', () => {
    it('should return an array of tasks for the specific user', async () => {
      const userId = 'user-123';
      const tasks = [{ title: 'Test', userId }];

      // Mock chainable .exec()
      mockTaskModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(tasks),
      });

      const result = await service.findAll(userId);
      expect(result).toEqual(tasks);
      expect(mockTaskModel.find).toHaveBeenCalledWith({ userId });
    });
  });

  // describe('markAsDone', () => {
  //   it('should update task status to done', async () => {
  //     const userId = 'user-123';
  //     const taskId = 'task-id';
  //     const updatedTask = { _id: taskId, status: 'done', isDone: true };

  //     mockTaskModel.findOneAndUpdate.mockReturnValue({
  //       exec: jest.fn().mockResolvedValue(updatedTask),
  //     });

  //     const result = await service.markAsDone(taskId, userId);
  //     expect(result).toEqual(updatedTask);
  //   });

  //   it('should throw NotFoundException if task not found', async () => {
  //     mockTaskModel.findOneAndUpdate.mockReturnValue({
  //       exec: jest.fn().mockResolvedValue(null),
  //     });

  //     await expect(service.markAsDone('bad-id', 'user-1')).rejects.toThrow(
  //       NotFoundException,
  //     );
  //   });
  // });
});
