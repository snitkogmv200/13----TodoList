import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { TaskListModule } from './taskList/taskList.module';
import { ProjectModule } from './project/project.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TaskModule,
    TaskListModule,
    ProjectModule,
    RoleModule,
  ],
})
export class AppModule {}
