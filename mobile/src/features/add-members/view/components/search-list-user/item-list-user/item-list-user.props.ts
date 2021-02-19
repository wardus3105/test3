/* 
    Created by longdq
*/

import { User } from 'types/user';
import { itemDataCheck } from './item-list-user.component';

export interface ItemListUserProps {
  item: User;
  addToDataCheck: (item: itemDataCheck) => void;
}
