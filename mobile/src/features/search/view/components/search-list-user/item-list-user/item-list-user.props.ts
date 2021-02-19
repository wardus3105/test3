/* 
    Created by longdq
*/

import { User } from 'types/user';

export interface ItemListUserProps {
  item: User;
  goToChatDetail: (item: User) => void;
}
