/* 
    Created by longdq
*/

import { processRequestRespository } from 'core/common/networking/api-helper';
import { pushStreamService } from 'helpers/hyper/push-stream-service';
import { User } from 'types/user';
import ListUserChatContainer from '../../features/list-user-chat/view/list-user-chat.screen';
import { ListChatModel } from './list-user-chat.props';
import ListUserChatServices from './list-user-chat.services';

export class ListUserChatAdapter {
  ListUserChatContainer: ListUserChatContainer;
  constructor(container: ListUserChatContainer) {
    this.ListUserChatContainer = container;
    //Init Socket
    pushStreamService.subChat(this.ListUserChatContainer.props.userInfo?.user?.id);
  }

  getListUser = () => {
    processRequestRespository(
      ListUserChatServices.getInstance().getListUser(),
      this.getListUserSuccess
    );
  };

  getListUserSuccess = (res: User[]) => {
    // console.log(res, 'data tra ve');
    this.ListUserChatContainer.setState({
      dataListUser: res,
    });
  };

  getListChat = () => {
    const { userInfo } = this.ListUserChatContainer.props;
    let { page, ITEM_PAGE } = this.ListUserChatContainer;
    // showLoading();
    this.ListUserChatContainer.setState({
      loading: true,
    });
    processRequestRespository(
      ListUserChatServices.getInstance().getRoomChat(userInfo.user.id, ITEM_PAGE, page),
      this.getListChatSuccess
    );
  };

  getListChatSuccess = (res: ListChatModel[]) => {
    this.ListUserChatContainer.setState({
      loading: false,
    });
    // hideLoading();
    console.log('test_list_user_page: ', this.ListUserChatContainer.page);
    const newData =
      this.ListUserChatContainer.page === 1
        ? [...res]
        : [...this.ListUserChatContainer.state.dataListChat, ...res];
    this.ListUserChatContainer.setState(
      {
        dataListChat: newData,
      },
      () => {
        console.log('test_list_user: ', this.ListUserChatContainer.state.dataListUser);
      }
    );
  };

  onRefresh = () => {
    this.ListUserChatContainer.page = 1;
    this.ListUserChatContainer.setState({
      dataListChat: [],
    });
    this.getListChat();
  };

  onEndReached = () => {
    console.log('test_onEndReached');
    const { dataListChat } = this.ListUserChatContainer.state;
    const { loading } = this.ListUserChatContainer.state;
    let { page, ITEM_PAGE } = this.ListUserChatContainer;
    if (loading || dataListChat.length < page * ITEM_PAGE) return;
    this.ListUserChatContainer.page += 1;
    this.getListChat();
    //Call url with new page
  };
}
