import {
  LoginMobileRequest,
  LoginMobileResponse,
} from '../../features/login-old/view/components/login-form-wv/login-form-wv.props';

/*
    Created by thaolt
*/

import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';

export interface LoginOldProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  userInfo: LoginMobileResponse;
  loginMobile: (data: LoginMobileRequest) => void;
}

export interface GetTGTRequest {
  username: string;
  password: string;
  service: string;
}

export interface GetTokenResponse {
  status: string;
  accessToken: string;
}
