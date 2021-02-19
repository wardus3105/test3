/* 
    Created by longdq
*/

import { Dispatch } from 'redux';
import NewMessageContainer from '../../features/new-message/view/new-message.screen';
import { processRequestRespository } from 'core/networking/api-helper';
import { User } from 'types/user';
import NewMessageServices from './new-message.services';
import NavigationService from 'routers/navigation-service';
import { CreateGroupScreen, ChatDetailScreen } from 'routers/screen-name';
import { TypeParam } from 'core/model-chat-detail/chat-detail.props';
import { showLoading, hideLoading } from 'libraries/loading/loading-modal';

export class NewMessageAdapter {
  NewMessageContainer: NewMessageContainer;
  constructor(container: NewMessageContainer) {
    this.NewMessageContainer = container;
  }

  goToChatDetail = (item: User) => {
    NavigationService.navigate(ChatDetailScreen, {
      chatInfo: { data: item, type: TypeParam.FROM_USER },
    });
  };

  onRefresh = () => {
    this.NewMessageContainer.page = 1;
    this.NewMessageContainer.setState({
      dataSearchUser: [],
    });
    this.searchUser();
  };

  onEndReached = () => {
    console.log('test_onEndReached');
    const { dataSearchUser } = this.NewMessageContainer.state;
    const { loading } = this.NewMessageContainer.state;
    let { page, ITEM_PAGE } = this.NewMessageContainer;
    if (loading || dataSearchUser.length < page * ITEM_PAGE) return;
    this.NewMessageContainer.page += 1;
    this.searchUser();
    //Call url with new page
  };

  searchUser = () => {
    const text = this.NewMessageContainer.state.txt;
    const { page, ITEM_PAGE } = this.NewMessageContainer;
    showLoading();
    this.NewMessageContainer.setState({
      loading: true,
    });
    processRequestRespository(
      NewMessageServices.getInstance().searchUser(text, ITEM_PAGE, page),
      this.searchUserSuccess
    );
  };

  setTxtSearch = (txt: string) => {
    this.NewMessageContainer.setState(
      {
        txt: txt,
        dataSearchUser: [],
      },
      () => {
        this.searchUser();
      }
    );
  };

  // searchUser = (text: string) => {
  //   showLoading();
  //   console.log(text, 'text search ......');
  //   processRequestRespository(
  //     NewMessageServices.getInstance().searchUser(text),
  //     this.searchUserSuccess
  //   );
  // };
  searchUserSuccess = (res: User[]) => {
    this.NewMessageContainer.setState({
      loading: false,
    });
    hideLoading();
    this.NewMessageContainer.setState({
      dataSearchUser: [...this.NewMessageContainer.state.dataSearchUser, ...res],
    });
  };

  goToCreateGr = () => {
    NavigationService.navigate(CreateGroupScreen);
  };
}
