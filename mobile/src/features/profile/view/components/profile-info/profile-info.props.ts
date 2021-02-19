/* 
    Created by longdq
*/

import { User } from 'types/user';

export interface ProfileInfoProps {
  userInfo: User;
  logout: () => void;
  goBack: () => void;
}
