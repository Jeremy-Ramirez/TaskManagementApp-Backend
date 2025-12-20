import { IsEnum, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
}

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Finish technical test',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: 'A brief description of the task',
    example: 'Complete the backend analysis and implementation',
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    enum: TaskStatus,
    example: TaskStatus.PENDING,
  })
  @IsEnum(TaskStatus, { message: 'Invalid status' })
  status: TaskStatus;
}
