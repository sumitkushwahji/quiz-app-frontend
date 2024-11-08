import { UserAchievement } from './achievement.model';
import { UserTestProgress } from './test-progress.model';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  testProgress?: UserTestProgress[];
  achievements?: UserAchievement[];
}
