/* 
    Created by longdq
*/

import { User } from 'types/user';

export interface ListMembersStates {
  dataSearchUser: User[];
  loading: boolean;
  txt: string;
}
