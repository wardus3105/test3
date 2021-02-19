/* 
    Created by longdq
*/

import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { LoginMobileResponse } from 'features/login-old/view/components/login-form-wv/login-form-wv.props';

export interface ListMembersProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  userInfo: LoginMobileResponse;
}
