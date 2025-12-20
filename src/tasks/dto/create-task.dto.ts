import { IsEnum, IsString, MinLength } from 'class-validator';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  description: string;

  @IsEnum(TaskStatus, { message: 'Invalid status' })
  status: TaskStatus;
}
