/* 
    Created by longdq
*/

import { processRequestRespository } from 'core/common/networking/api-helper';
import ProfileGroupContainer from 'features/profile-group/view/profile-group.screen';
import { User } from 'types/user';
import ProfileGroupServices from './profile-group.services';
import { ModelInfoGr } from './profile-group.states';

export class ProfileGroupAdapter {
  ProfileGroupContainer: ProfileGroupContainer;
  constructor(container: ProfileGroupContainer) {
    this.ProfileGroupContainer = container;
  }

  goToChatDetail = () => {};

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
