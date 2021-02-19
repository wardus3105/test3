/*  
    Created by longdq
*/

import { ListChatModel } from './list-user-chat.props';
import { User } from 'types/user';

export interface ListUserChatStates {
  dataListUser: User[];
  dataListChat: ListChatModel[];
  loading: boolean;
}
