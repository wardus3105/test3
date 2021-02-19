/* 
    Created by longdq
*/

import { Dispatch } from 'redux';
import ProfileOthersContainer from '../../features/profile-others/view/profile-others.screen';
import navigationService from 'routers/navigation-service';

export class ProfileOthersAdapter {
  ProfileOthersContainer: ProfileOthersContainer;
  constructor(container: ProfileOthersContainer) {
    this.ProfileOthersContainer = container;
  }

  goBack = () => {
    navigationService.goBack();
  };
}
