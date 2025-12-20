import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class Task extends Document {
  @ApiProperty({
    example: 'Buy groceries',
    description: 'The title of the task',
  })
  @Prop({ required: true })
  title: string;

  @ApiProperty({
    example: 'Milk, Eggs, Bread',
    description: 'The description of the task',
  })
  @Prop()
  description: string;

  @ApiProperty({ example: 'pending', description: 'The status of the task' })
  @Prop()
  status: string;

  @ApiProperty({
    example: '2023-10-25T10:00:00.000Z',
    description: 'Creation date',
  })
  @Prop({ default: Date.now })
  createdAt: Date;

  @ApiProperty({
    example: '2023-10-25T12:00:00.000Z',
    description: 'Last update date',
  })
  @Prop({ default: Date.now })
  updatedAt: Date;

  @ApiProperty({
    example: 'user-12345',
    description: 'The ID of the user who owns the task',
  })
  @Prop({ required: true })
  userId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
