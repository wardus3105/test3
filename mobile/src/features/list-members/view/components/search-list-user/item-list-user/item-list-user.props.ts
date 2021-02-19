/* 
    Created by longdq
*/

import { User2 } from 'types/user';

export interface ItemListUserProps {
  item: User2;
  goToChatDetail: (item: User2) => void;
}
