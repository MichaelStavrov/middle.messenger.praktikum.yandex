import { UserInfoRow } from '../types';

export const getUserInfoRows = (
  rows: UserInfoRow[],
  user: Nullable<User>
): UserInfoRow[] => {
  return rows.map((row) => {
    if (user && row.name in user) {
      row.value = user[row.name as keyof User];
    }
    return row;
  });
};
