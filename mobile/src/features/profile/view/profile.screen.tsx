/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import { NavigationParams, NavigationScreenProp, NavigationState } from 'react-navigation';
import { ProfileAdapter } from 'core/model-profile/profile.adapter';
import { ProfileProps } from 'core/model-profile/profile.props';
import { ProfileStates } from 'core/model-profile/profile.states';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import colors from 'res/colors';
import { AppStatusBarComponent } from 'libraries/main/container/app-status-bar/app-status-bar.component';
import { User } from '../../../types/user';

export default class ProfileContainer extends React.PureComponent<ProfileProps, ProfileStates> {
  ProfileAdapter: ProfileAdapter;
  user: User = null;
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  constructor(props: ProfileProps) {
    super(props);
    this.ProfileAdapter = new ProfileAdapter(this);
    this.state = {};

    this.navigation = props.navigation;
    this.user = this.navigation.getParam('user');
  }

  componentDidMount() {
    StatusBar.setBackgroundColor(colors.primaryColor);
    StatusBar.setBarStyle('light-content');
  }

  componentWillUnmount() {
    StatusBar.setBackgroundColor(colors.white);
    StatusBar.setBarStyle('dark-content');
  }

  render() {
    return (
      <View>
        <AppStatusBarComponent />
        <ProfileInfoComponent
          userInfo={this.user}
          logout={this.ProfileAdapter.logout}
          goBack={this.ProfileAdapter.goBack}
        />
      </View>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {},
});
