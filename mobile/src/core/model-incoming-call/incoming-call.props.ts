
/* 
    Created by longdq
*/

import { NavigationParams, NavigationScreenProp, NavigationState } from "react-navigation";
import { User } from '../../types/user';

export interface IncomingCallProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>
  userInfo: User
}

