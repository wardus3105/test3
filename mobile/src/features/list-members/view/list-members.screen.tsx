/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ContainerComponent } from 'libraries/main/container/container.component';
import { ListMembersAdapter } from 'core/model-list-members/list-members.adapter';
import { ListMembersProps } from 'core/model-list-members/list-members.props';
import { ListMembersStates } from 'core/model-list-members/list-members.states';
import { HeaderTypes } from 'types/header-types';
import { SearchComponent } from './components/search/search.component';
import { SearchListUserComponent } from './components/search-list-user/search-list-user.component';
import { UserInfoComponent } from 'features/list-user-chat/view/components/user-info/user-info.component';

export default class ListMembersContainer extends React.PureComponent<
  ListMembersProps,
  ListMembersStates
> {
  ListMembersAdapter: ListMembersAdapter;
  //Local States

  page: number = 1;
  ITEM_PAGE = 15;

  constructor(props: ListMembersProps) {
    super(props);
    this.ListMembersAdapter = new ListMembersAdapter(this);
    this.state = {
      dataSearchUser: [],
      loading: false,
      txt: '',
    };
  }

  componentDidMount = () => {
    this.ListMembersAdapter.searchUser();
  };

  render() {
    const { userInfo } = this.props;
    const { dataSearchUser } = this.state;
    return (
      <ContainerComponent style={styles.container} headerType={HeaderTypes.NONE}>
        <UserInfoComponent
          userInfo={userInfo && userInfo.user}
          // goToProfile={this.ListMembersAdapter.goToProfile}
          goToNewMess={this.ListMembersAdapter.goToNewMess}
        />
        <SearchComponent search={this.ListMembersAdapter.setTxtSearch} />
        <SearchListUserComponent
          dataSearchUser={dataSearchUser}
          goToChatDetail={this.ListMembersAdapter.goToChatDetail}
          loading={this.state.loading}
          onEndReached={this.ListMembersAdapter.onEndReached}
          onRefresh={this.ListMembersAdapter.onRefresh}
          page={this.page}
          ITEM_PAGE={this.ITEM_PAGE}
        />
      </ContainerComponent>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
