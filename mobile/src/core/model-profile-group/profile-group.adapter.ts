/* 
    Created by longdq
*/

import { Dispatch } from 'redux';
import ProfileGroupContainer from '../view/profile-group.screen';
import { processRequestRespository } from 'core/networking/api-helper';
import ProfileGroupServices from './profile-group.services';
import { ModelInfoGr } from './profile-group.states';
import { User } from 'types/user';
import navigationService from 'routers/navigation-service';
import { AddMembersScreen } from 'routers/screen-name';

export class ProfileGroupAdapter {
  ProfileGroupContainer: ProfileGroupContainer;
  constructor(container: ProfileGroupContainer) {
    this.ProfileGroupContainer = container;
  }

  goToChatDetail = () => {};

  goToAddMembers = () => {
    const chatId = this.ProfileGroupContainer.chatInfo && this.ProfileGroupContainer.chatInfo.id;
    navigationService.navigate(AddMembersScreen, { chatId: chatId });
  };
  goBack = () => {
    navigationService.goBack();
  };

  getInfo = () => {
    const chatId = this.ProfileGroupContainer.chatInfo && this.ProfileGroupContainer.chatInfo.id;
    processRequestRespository(
      ProfileGroupServices.getInstance().getInfoChat(chatId),
      this.getInfoSuccess
    );
  };

  getInfoSuccess = (res: ModelInfoGr) => {
    if (res) {
      this.ProfileGroupContainer.setState({
        dataInfoGr: res,
      });
    }
  };

  removeUserGr = (item: User) => {
    const chatId = this.ProfileGroupContainer.chatInfo && this.ProfileGroupContainer.chatInfo.id;
    const userId = item && item.id;
    if (chatId && userId) {
      processRequestRespository(
        ProfileGroupServices.getInstance().removeUserGr(userId, chatId),
        this.removeUserSuccess
      );
    }
  };

  removeUserSuccess = (res: any) => {
    if (res) {
      this.getInfo();
    }
  };
}
