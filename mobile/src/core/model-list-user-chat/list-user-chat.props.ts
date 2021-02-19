/* 
    Created by longdq
*/

import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { LoginMobileResponse } from 'features/login-old/view/components/login-form-wv/login-form-wv.props';
import { StatusUserTypes } from 'types/user';
import { User } from '../../types/user';

export interface ListUserChatProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  userInfo: LoginMobileResponse;
  getListChat: () => void;
  dataListChat: MessengerModel[];
}

export interface MessengerModel {
  chatId: string;
  contentType: string;
  createdAt: string;
  fileExtension: string;
  fileSize: string;
  id: string;
  message: string;
  modifiedDate: string;
  path: string;
  refId: string;
  replyId: string;
  role: string;
  seenId: string;
  status: string;
  title: string;
  type: string;
  typeRole: string;
  updatedAt: string;
  userId: string;
}

// export interface ListChatModel {
//   avatar_url: string;
//   contact: User;
//   id: string;
//   messengers: MessengerModel[];
//   slogan: string;
//   title: string;
//   totalMessengers: number;
//   type: string;
//   userPosition: number;
//   statusUser: StatusUserTypes;
//   nameTitle: string;
// }

export interface ListChatModel {
  avatar: string;
  chats: [];
  createdAt: string;
  createdBy: string;
  created_by: string;
  description: string;
  id: string;
  slogan: string;
  status: string;
  title: string;
  type: string;
  updatedAt: string;
}
