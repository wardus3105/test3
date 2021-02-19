/* 
    Created by longdq
*/

import { Dispatch } from 'redux';
import ListMembersContainer from '../../features/list-members/view/list-members.screen';
import {
  ProfileScreen,
  SearchScreen,
  NewMessageScreen,
  ChatDetailScreen,
} from 'routers/screen-name';
import NavigationService from 'routers/navigation-service';
import { processRequestRespository } from 'core/networking/api-helper';
import ListMembersServices from './list-members.services';
import { User } from 'types/user';
import { TypeParam } from 'core/model-chat-detail/chat-detail.props';
import { showLoading, hideLoading } from 'libraries/loading/loading-modal';

export class ListMembersAdapter {
  ListMembersContainer: ListMembersContainer;
  constructor(container: ListMembersContainer) {
    this.ListMembersContainer = container;
  }

  goToProfile = () => {
    NavigationService.navigate(ProfileScreen, {
      user: this.ListMembersContainer.props.userInfo.user,
    });
  };

  goToSearch = () => {
    NavigationService.navigate(SearchScreen);
  };

  goToNewMess = () => {
    NavigationService.navigate(NewMessageScreen);
  };

  onRefresh = () => {
    this.ListMembersContainer.page = 1;
    this.ListMembersContainer.setState({
      dataSearchUser: [],
    });
    this.searchUser();
  };

  onEndReached = () => {
    console.log('test_onEndReached');
    const { dataSearchUser } = this.ListMembersContainer.state;
    const { loading } = this.ListMembersContainer.state;
    let { page, ITEM_PAGE } = this.ListMembersContainer;
    if (loading || dataSearchUser.length < page * ITEM_PAGE) return;
    this.ListMembersContainer.page += 1;
    this.searchUser();
    //Call url with new page
  };

  setTxtSearch = (txt: string) => {
    this.ListMembersContainer.setState(
      {
        txt: txt,
        dataSearchUser: [],
      },
      () => {
        this.searchUser();
      }
    );
  };

  searchUser = () => {
    const text = this.ListMembersContainer.state.txt;
    const { page, ITEM_PAGE } = this.ListMembersContainer;
    showLoading();
    this.ListMembersContainer.setState({
      loading: true,
    });
    processRequestRespository(
      ListMembersServices.getInstance().searchUser(text, ITEM_PAGE, page),
      this.searchUserSuccess
    );
  };
  searchUserSuccess = (res: User[]) => {
    this.ListMembersContainer.setState({
      loading: false,
    });
    hideLoading();
    this.ListMembersContainer.setState({
      dataSearchUser: [...this.ListMembersContainer.state.dataSearchUser, ...res],
    });
  };

  goToChatDetail = (item: User) => {
    NavigationService.navigate(ChatDetailScreen, {
      chatInfo: { data: item, type: TypeParam.FROM_USER },
    });
  };
}
