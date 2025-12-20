import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot(), // Make sure ConfigModule is initialized

    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule to make ConfigService available
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // Get URI from environment variables
        // other options like dbName, user, pass can be added here
      }),
      inject: [ConfigService],
    }),
    CommonModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
