import { Module } from '@nestjs/common';
import { UserActivityResolver } from './user-activity.resolver';

@Module({
  providers: [UserActivityResolver],
})
export class UserActivityModule {}
