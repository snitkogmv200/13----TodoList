import { Module } from '@nestjs/common';
import { TaskListService } from './taskList.service';
import { TaskListController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [TaskListService],
  controllers: [TaskListController],
})
export class TaskListModule {}
