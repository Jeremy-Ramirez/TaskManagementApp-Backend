import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: string) {
    try {
      const task = await this.taskModel.create({ ...createTaskDto, userId });
      return task;
    } catch (error) {
      throw error;
    }
  }

  async findAll(userId: string) {
    try {
      const tasks = await this.taskModel.find({ userId }).exec();
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const task = await this.taskModel.findOne({ _id: id, userId }).exec();

      if (!task) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }

      return task;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
    try {
      const task = await this.taskModel
        .findOneAndUpdate({ _id: id, userId }, updateTaskDto, { new: true })
        .exec();

      if (!task) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }
      return task;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string, userId: string) {
    const { deletedCount } = await this.taskModel
      .deleteOne({ _id: id, userId })
      .exec();

    if (deletedCount === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return;
  }
}
