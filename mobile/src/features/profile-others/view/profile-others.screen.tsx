/* 
    Created by longdq
*/

import * as React from 'react';
import { View, StyleSheet, StatusBar, Image, Text, Dimensions } from 'react-native';
import { ContainerComponent } from 'libraries/main/container/container.component';
import { ProfileOthersAdapter } from 'core/model-profile-others/profile-others.adapter';
import { ProfileOthersProps } from 'core/model-profile-others/profile-others.props';
import { ProfileOthersStates } from 'core/model-profile-others/profile-others.states';
import { AppStatusBarComponent } from 'libraries/main/container/app-status-bar/app-status-bar.component';
import colors from 'res/colors';
import { HyperButtonComponent } from 'libraries/hyper-button/hyper-button.component';
import svgs from 'res/svgs';
import { NotifiOnOffComponent } from 'libraries/notifi-on-off/notifi-on-off.component';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

export default class ProfileOthersContainer extends React.PureComponent<
  ProfileOthersProps,
  ProfileOthersStates
> {
  ProfileOthersAdapter: ProfileOthersAdapter;
  //Local States
  info: any;

  constructor(props: ProfileOthersProps) {
    super(props);
    this.ProfileOthersAdapter = new ProfileOthersAdapter(this);
    const { navigation } = this.props;
    this.info = navigation.getParam('user');
  }

  componentDidMount() {
    StatusBar.setBackgroundColor(colors.primaryColor);
    StatusBar.setBarStyle('light-content');
  }

  componentWillUnmount() {
    StatusBar.setBackgroundColor(colors.white);
    StatusBar.setBarStyle('dark-content');
  }

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'First' },
      { key: '2', title: 'Second' },
    ],
  };

  renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: colors.primaryColor,
        height: 3,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      }}
      style={{ backgroundColor: '#fff' }}
      labelStyle={{ fontSize: 14, textTransformations: 'none' }}
      getLabelText={({ route }) => route.title}
      activeColor={colors.primaryColor}
      inactiveColor="#4D5971"
    />
  );

  renderScene = ({ route, jumpTo }) => {
    console.log('hehe', route);
    switch (route.key) {
      case 'First':
        return <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />;
      case 'Second':
        return <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />;
    }
  };

  FirstRoute = () => <View style={[styles.scene, { backgroundColor: '#ff4081' }]} />;

  SecondRoute = () => <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppStatusBarComponent />
        <View style={styles.wrapInfo}>
          <View style={styles.wrapHeader}>
            <HyperButtonComponent onPress={this.ProfileOthersAdapter.goBack} img={svgs.ic_back} />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 24 }}>
                <HyperButtonComponent img={svgs.ic_message} />
              </View>
              <HyperButtonComponent img={svgs.ic_video_call} />
            </View>
          </View>
          <View style={styles.wrapImage}>
            <Image
              source={{ uri: 'https://hanoimoi.com.vn/Uploads/tuandiep/2018/4/8/1(1).jpg' }}
              style={styles.avatar}
            />
            <Text style={styles.title}>{this.info}</Text>
          </View>
        </View>
        <View style={{ marginTop: 16 }}>
          <NotifiOnOffComponent />
          <View style={styles.line} />
        </View>
        <View style={{ flex: 1, marginTop: 9, paddingHorizontal: 16 }}>
          <TabView
            navigationState={{
              index: this.state.index,
              routes: [
                { key: '1', title: 'Hình ảnh' },
                { key: '2', title: 'Tài liệu' },
                { key: '3', title: 'Link' },
              ],
            }}
            onIndexChange={(i) => {
              this.setState({
                index: i,
              });
            }}
            renderScene={this.renderScene}
            renderTabBar={this.renderTabBar}
          />
        </View>
      </View>
    );
  }
}

//Styles
const styles = StyleSheet.create({
  container: {},
  wrapInfo: {
    height: 155,
    width: '100%',
    backgroundColor: colors.primaryColor,
  },
  wrapHeader: {
    height: 56,
    width: '100%',
    // marginTop: 44,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapImage: {
    marginTop: 7,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 16,
  },
  line: {
    height: 1,
    width: '100%',
    marginHorizontal: 16,
    backgroundColor: '#E6E8EB',
    marginTop: 5,
  },
  scene: {
    flex: 1,
  },
});
