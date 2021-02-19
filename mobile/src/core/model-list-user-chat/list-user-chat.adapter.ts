/* 
    Created by longdq
*/

import { Dispatch } from 'redux';
import ListUserChatContainer from '../../features/list-user-chat/view/list-user-chat.screen';
import { processRequestRespository } from 'core/networking/api-helper';
import ListUserChatServices from './list-user-chat.services';
import { ListChatModel } from './list-user-chat.props';
import NavigationService from 'routers/navigation-service';
import {
  SearchScreen,
  ChatDetailScreen,
  AuthenNavigator,
  ProfileScreen,
  NewMessageScreen,
  IncomingCallScreen,
} from 'routers/screen-name';
import { User } from 'types/user';
import { Alert } from 'react-native';
import { translate } from 'res/languages';
import AsyncStorageHelpers, { StorageKey } from 'helpers/async-storage-helpers';
import { showLoading, hideLoading } from '../../libraries/loading/loading-modal';
import { TypeParam } from 'core/model-chat-detail/chat-detail.props';
import { pushStreamService } from 'helpers/hyper/push-stream-service';

export class ListUserChatAdapter {
  ListUserChatContainer: ListUserChatContainer;
  constructor(container: ListUserChatContainer) {
    this.ListUserChatContainer = container;
    //Init Socket
    pushStreamService.subChat(this.ListUserChatContainer.props.userInfo?.user?.id);
  }

  goToProfile = () => {
    NavigationService.navigate(ProfileScreen, {
      user: this.ListUserChatContainer.props.userInfo.user,
    });
  };

  goToSearch = () => {
    NavigationService.navigate(SearchScreen);
  };

  goToNewMess = () => {
    NavigationService.navigate(NewMessageScreen);
  };

  goToNotifi = () => {
    // NavigationService.navigate(IncomingCallScreen);
  };

  goToChatDetail = (item: ListChatModel) => {
    console.log('test_item_chat_dtl: ', item);
    NavigationService.navigate(ChatDetailScreen, {
      chatInfo: { data: item, type: TypeParam.FORM_MESSAGE },
    });
  };

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

  // logout = () => {
  //   console.log('test_logout');
  //   // try {
  //   //   await AsyncStorage.removeItem('userToken');
  //   // } catch (e) {
  //   //   console.log(e);
  //   // }
  //   // dispatch({type: 'LOGOUT'});

  //   // pushStreamService.closeSocket();
  //   // navigation.goBack();
  //   // signOut();

  // };

  getInfoVideoCall = async() =>{
    console.log('test_video_call_0: ')
    const data: string = (await AsyncStorageHelpers.get(StorageKey.VIDEO_CALL_INFO)) as string;
    const info: any = JSON.parse(data);
    
    NavigationService.navigate(IncomingCallScreen, {
      type: info?.data?.type,
      user: JSON.parse(info?.data?.user || ''),
      chatInfo: JSON.parse(info?.data?.chatInfo || ''),
    });
    console.log('test_video_call: ', JSON.parse(info?.data?.user))
  }
}

/**
 * Logout
 */
export const logout = (forceLogout = false, func: any) => {
  Alert.alert(
    translate('warning.title'),
    translate('logout.content'),
    [
      { text: translate('common.yes'), onPress: () => clearUserInfo(func) },
      { text: translate('common.no'), onPress: () => console.log('no') },
    ],
    { cancelable: true }
  );
};
const clearUserInfo = async (func: any) => {
  showLoading();
  await AsyncStorageHelpers.remove(StorageKey.USER_INFO);
  // await AsyncStorageHelpers.remove(StorageKey.DEVICE_INFO);
  // Remove user redux
  func();
  hideLoading();
  NavigationService.reset(AuthenNavigator);
};
