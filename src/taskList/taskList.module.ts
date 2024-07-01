import { Module, forwardRef } from '@nestjs/common';
import { TaskListService } from './taskList.service';
import { TaskListController } from './taskList.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [PrismaModule, AuthModule, ProjectModule],
  providers: [TaskListService],
  controllers: [TaskListController],
})
export class TaskListModule {}
