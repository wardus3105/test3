/* 
    Created by longdq
*/

import { User } from 'types/user';
import { User2 } from '../../../../../types/user';

export interface UserInfoProps {
  userInfo: User2;
  goToProfile: () => void;
  goToNewMess: () => void;
  goToNotifi: () => void;
}
