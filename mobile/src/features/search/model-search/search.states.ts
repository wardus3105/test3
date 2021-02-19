/* 
    Created by longdq
*/

import { User } from 'types/user';

export interface SearchStates {
  dataSearchUser: User[];
  loading: boolean;
  txt: string;
}
