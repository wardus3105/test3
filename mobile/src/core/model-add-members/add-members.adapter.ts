/* 
    Created by longdq
*/

import { Dispatch } from 'redux';
import AddMembersContainer from '../../features/add-members/view/add-members.screen';
import { showLoading, hideLoading } from 'libraries/loading/loading-modal';
import { processRequestRespository } from 'core/networking/api-helper';
import AddMembersServices from './add-members.services';
import { User } from 'types/user';
import { itemDataCheck } from 'features/create-group/view/components/search-list-user/item-list-user/item-list-user.component';

export class AddMembersAdapter {
  AddMembersContainer: AddMembersContainer;
  constructor(container: AddMembersContainer) {
    this.AddMembersContainer = container;
  }

  onRefresh = () => {
    this.AddMembersContainer.page = 1;
    this.AddMembersContainer.setState({
      dataSearchUser: [],
    });
    this.searchUser();
  };

  onEndReached = () => {
    console.log('test_onEndReached');
    const { dataSearchUser } = this.AddMembersContainer.state;
    const { loading } = this.AddMembersContainer.state;
    let { page, ITEM_PAGE } = this.AddMembersContainer;
    if (loading || dataSearchUser.length < page * ITEM_PAGE) return;
    this.AddMembersContainer.page += 1;
    this.searchUser();
    //Call url with new page
  };

  setTxtSearch = (txt: string) => {
    this.AddMembersContainer.setState(
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
    const text = this.AddMembersContainer.state.txt;
    const { page, ITEM_PAGE } = this.AddMembersContainer;
    showLoading();
    this.AddMembersContainer.setState({
      loading: true,
    });
    processRequestRespository(
      AddMembersServices.getInstance().searchUser(text, ITEM_PAGE, page),
      this.searchUserSuccess
    );
  };
  searchUserSuccess = (res: User[]) => {
    this.AddMembersContainer.setState({
      loading: false,
    });
    hideLoading();
    this.AddMembersContainer.setState({
      dataSearchUser: [...this.AddMembersContainer.state.dataSearchUser, ...res],
    });
  };

  // searchUser = (text: string) => {
  //   showLoading();
  //   processRequestRespository(
  //     CreateGroupServices.getInstance().searchUser(text),
  //     this.searchUserSuccess
  //   );
  // };
  // searchUserSuccess = (res: User[]) => {
  //   hideLoading();
  //   this.CreateGroupContainer.setState({
  //     dataSearchUser: res,
  //   });
  // };

  setSateDataCheck = (data: itemDataCheck[]) => {
    this.AddMembersContainer.setState({
      dataUserCheck: data,
    });
  };

  addToDataCheck = (item: itemDataCheck) => {
    let data = this.AddMembersContainer.state.dataUserCheck;
    let isAdd = true;
    if (data && data.length > 0) {
      const id = item && item.item && item.item.id;
      data.map((element: itemDataCheck) => {
        if (element && element.item && element.item.id === id) {
          isAdd = false;
        }
      });
      if (isAdd == true) {
        this.AddMembersContainer.setState({
          dataUserCheck: [item, ...this.AddMembersContainer.state.dataUserCheck],
        });
      } else {
        return;
      }
    } else {
      this.AddMembersContainer.setState({
        dataUserCheck: [item, ...this.AddMembersContainer.state.dataUserCheck],
      });
    }
  };

  removeUserCheck = (item: itemDataCheck) => {
    const data = this.AddMembersContainer.state.dataUserCheck;
    const id = item && item.item && item.item.id;
    let newData = data.filter((e: itemDataCheck) => {
      return e && e.item && e.item.id !== id;
    });
    this.AddMembersContainer.setState({
      dataUserCheck: [...newData],
    });
  };

  onCreateGr = () => {
    let listIdUser: string[] = [];
    const data = this.AddMembersContainer.state.dataUserCheck;
    if (data && data.length > 0) {
      data.map((e: itemDataCheck) => {
        const id = e && e.item && e.item.id;
        listIdUser.push(id);
      });
      const chatId = this.AddMembersContainer.chatId;
      if (!chatId) {
        return;
      }
      const dataPost = {
        chatId: chatId,
        members: listIdUser,
      };
      showLoading();
      processRequestRespository(
        AddMembersServices.getInstance().addMembers(dataPost),
        this.createGrSuccess
      );
    }
  };

  onChangeText = (txt: string) => {
    if (txt) {
      this.AddMembersContainer.setState({
        emptyNameGr: false,
      });
    }
    this.AddMembersContainer.setState({
      nameGr: txt,
    });
  };

  createGrSuccess = (res: any) => {
    hideLoading();
    if (res) {
      // NavigationService.popMany(2);
      // EventBus.getInstance().post({
      //   type: EventBusName.RELOAD_LIST_CHAT,
      //   payload: 'RELOAD_LIST_CHAT',
      // });
    }
  };
}
