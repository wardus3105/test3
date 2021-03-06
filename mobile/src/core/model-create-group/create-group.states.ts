/* 
    Created by longdq
*/

import { User } from 'types/user';
import { itemDataCheck } from '../../features/create-group/view/components/search-list-user/item-list-user/item-list-user.component';

export interface CreateGroupStates {
  dataSearchUser: User[];
  loading: boolean;
  txt: string;

  dataUserCheck: itemDataCheck[];
  nameGr: string;
  emptyNameGr: boolean;
}
