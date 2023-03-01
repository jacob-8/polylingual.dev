import { createUserStore, firebaseConfig, type IBaseUser } from 'sveltefirets';

// export interface IUser extends IBaseUser {
//   theme: string;
// }

export type User = IBaseUser;

export const user = createUserStore<User>({
  userKey: `${firebaseConfig.projectId}_firebase_user`,
  log: true,
});