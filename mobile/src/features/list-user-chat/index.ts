/* 
    Created by longdq
*/

import ListUserChatContainer from 'features/list-user-chat/view/list-user-chat.screen';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export const ListUserChatScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListUserChatContainer);
