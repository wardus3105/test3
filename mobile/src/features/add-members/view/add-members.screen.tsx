/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ContainerComponent } from 'libraries/main/container/container.component';
import { AddMembersAdapter } from 'core/model-add-members/add-members.adapter';
import { AddMembersProps } from 'core/model-add-members/add-members.props';
import { AddMembersStates } from 'core/model-add-members/add-members.states';
import { HeaderTypes } from 'types/header-types';
import { translate } from 'res/languages';
import { ListUserCheckComponent } from './components/list-user-check/list-user-check.component';
import { SearchListUserComponent } from './components/search-list-user/search-list-user.component';
import { SearchComponent } from './components/search/search.component';

export default class AddMembersContainer extends React.PureComponent<
  AddMembersProps,
  AddMembersStates
> {
  AddMembersAdapter: AddMembersAdapter;
  //Local States
  page: number = 1;
  ITEM_PAGE = 15;
  chatId: string;

  constructor(props: AddMembersProps) {
    super(props);
    this.AddMembersAdapter = new AddMembersAdapter(this);
    const { navigation } = this.props;
    this.chatId = navigation.getParam('chatId');
    this.state = {
      dataSearchUser: [],
      dataUserCheck: [],
      nameGr: '',
      emptyNameGr: false,
      loading: false,
      txt: '',
    };
  }

  componentDidMount = () => {
    this.AddMembersAdapter.searchUser();
  };

  render() {
    const { dataSearchUser, dataUserCheck, emptyNameGr } = this.state;

    return (
      <ContainerComponent
        style={styles.container}
        title={translate('createGr.addMember')}
        headerType={HeaderTypes.BACK_TITLE}
      >
        <SearchComponent search={this.AddMembersAdapter.setTxtSearch} />
        <SearchListUserComponent
          dataSearchUser={dataSearchUser}
          addToDataCheck={this.AddMembersAdapter.addToDataCheck}
          loading={this.state.loading}
          onEndReached={this.AddMembersAdapter.onEndReached}
          onRefresh={this.AddMembersAdapter.onRefresh}
          page={this.page}
          ITEM_PAGE={this.ITEM_PAGE}
        />
        <ListUserCheckComponent
          dataUserCheck={dataUserCheck}
          removeUserCheck={this.AddMembersAdapter.removeUserCheck}
          onCreateGr={this.AddMembersAdapter.onCreateGr}
        />
      </ContainerComponent>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {},
});
