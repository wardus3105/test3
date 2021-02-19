/* 
    Created by longdq
*/

import { Dispatch } from 'redux';
import ProfileContainer from '../../features/profile/view/profile.screen';
import { logout } from 'core/model-list-user-chat/list-user-chat.adapter';
import NavigationService from 'routers/navigation-service';

export class ProfileAdapter {
  ProfileContainer: ProfileContainer;
  constructor(container: ProfileContainer) {
    this.ProfileContainer = container;
  }

  logout = () => {
    logout(undefined,  this.ProfileContainer.props.removeUserInfoAction);
  };

  goBack = () => {
    NavigationService.goBack();
  };
}
