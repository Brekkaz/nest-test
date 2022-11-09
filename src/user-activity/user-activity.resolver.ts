import { Query, Resolver } from '@nestjs/graphql';
import { UserActivity } from '../graphql';

@Resolver()
export class UserActivityResolver {
  /**
   * Returns the datetime of a user
   * @param id user id
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query((returns) => UserActivity)
  getUserActivity(root, { id }): UserActivity {
    return {
      id: 'user' + id,
      datetime: 'datetime1',
    };
  }
}
