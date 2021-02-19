/* 
    Created by longdq
*/

import { User } from 'types/user';

export interface SearchListUserProps {
  dataSearchUser: User[];
  goToChatDetail: (item: User) => void;
  loading: boolean;
  onEndReached: () => void;
  onRefresh: () => void;
  page: number;
  ITEM_PAGE: number;
}
