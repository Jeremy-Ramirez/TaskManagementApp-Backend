import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser('userId') userId: string,
  ) {
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  findAll(@GetUser('userId') userId: string) {
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseMongoIdPipe) id: string,
    @GetUser('userId') userId: string,
  ) {
    return this.tasksService.findOne(id, userId);
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser('userId') userId: string,
  ) {
    return this.tasksService.update(id, updateTaskDto, userId);
  }

  @Delete(':id')
  remove(
    @Param('id', ParseMongoIdPipe) id: string,
    @GetUser('userId') userId: string,
  ) {
    return this.tasksService.remove(id, userId);
  }

  @Patch(':id/done')
  markAsDone(
    @Param('id', ParseMongoIdPipe) id: string,
    @GetUser('userId') userId: string,
  ) {
    return this.tasksService.markAsDone(id, userId);
  }
}
