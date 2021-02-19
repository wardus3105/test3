/* 
    Created by longdq
*/

import { User } from 'types/user';

export interface NewMessageStates {
  dataSearchUser: User[];
  loading: boolean;
  txt: string;
}
