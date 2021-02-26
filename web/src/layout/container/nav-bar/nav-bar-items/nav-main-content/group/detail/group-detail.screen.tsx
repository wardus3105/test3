import React from 'react';

import './group-detail.scss';
import AddMemberScreen from '../add-member/add-member.screen';
import { IBodyConversationDetail } from '../../conversation-detail/body/body-conversation-detail.props';
import { IHeaderConversationDetail } from '../../conversation-detail/header/header-conversation-detail.props';
import ConversationDetailScreen from '../../conversation-detail/main/conversation-detail.screen';
import FileContextChatScreen from '../../conversation/chat-list/context-chat/file-context-chat/file-context-chat.screen';

import GroupDetailAdapter from './group-detail.adapter';
import { IMiniImage } from '../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.props';
import { ENUM_KIND_OF_STATUS } from '../../../../../../../libraries/Enum/status';
import CircleAvatarScreen from '../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import CustomBadgeScreen from '../../../../../../../libraries/Features/custom-badge/custom-badge.screen';
import MainPopupScreen from '../../../../../../../libraries/Features/popup/main-popup/main-popup.screen';
import DetailPopupScreen from '../../../../../../../libraries/Features/popup/detail-popup/detail-popup.screen';
import { ENUM_KIND_OF_CONVERSATIONDETAIL } from '../../../../../../../libraries/Enum/conversation-detail';
import ModalScreen from '../../../../../../../libraries/Features/modal/modal.screen';
import IconCirclePanel from '../../../../../../../libraries/Features/icon-circle-panel/icon-circle-panel.screen';
import getApiUrl from '../../../../../../../libraries/Functions/get-api-url';
import ImageOverlayScreen from '../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.screen';

const iconUserLineAdd = require("../../../../../../../libraries/Icons/user-line-add.svg").default;
const iconSignoutRight = require("../../../../../../../libraries/Icons/signout-right.svg").default;
const iconTrashDeleteBin = require("../../../../../../../libraries/Icons/trash-delete-bin.svg").default;
// const iconMoreVertical = require("../../../../../../../libraries/Icons/more-vertical.svg").default;
const iconUserLine = require("../../../../../../../libraries/Icons/user-line.svg").default;
const iconChatMessage2Line = require("../../../../../../../libraries/Icons/chat-message-2-line.svg").default;
const iconEyesShowVisible = require("../../../../../../../libraries/Icons/eyes-show-visible.svg").default;
const iconBellNotificationOn = require("../../../../../../../libraries/Icons/bell-notification-on.svg").default;



function GroupDetailScreen() {

  const {
    toggleNoti,
    activeLi,
    toggleOverlay,
    iconnoti,
    isOpenOverlay,
    mainImage,
    onChangeActiveLi,
    memberInGroup,
    linkInGroup,
    imageInGroup,
    groupDetail,
    fileInGroup,
    miniImageList
  } = GroupDetailAdapter();

  const listEles = [
    {
      onClick: null,
      icon: iconUserLine,
      text: "Chỉ định là admin",
      eleContext: null,
    },
    {
      onClick: null,
      icon: iconChatMessage2Line,
      text: "Nhắn tin",
      eleContext: null,
    },
    {
      onClick: null,
      icon: iconEyesShowVisible,
      text: "Xem thông tin cá nhân",
      eleContext: null,
    },
    {
      onClick: null,
      icon: iconTrashDeleteBin,
      text: "Xóa khỏi nhóm",
      eleContext: null,
    },
  ];

  const eleDetailPopup = (onClosePopup: any) => (<DetailPopupScreen
    listEles={listEles}
    onClosePopup={onClosePopup}
  ></DetailPopupScreen>);

  const showMemberInGroup = () => {
    if (memberInGroup.length > 0) {
      memberInGroup.sort(function (prev, next) { return prev.is_admin + "" === ENUM_KIND_OF_STATUS.ACTIVE ? -1 : next.is_admin + "" === ENUM_KIND_OF_STATUS.ACTIVE ? 1 : 0; });

      return memberInGroup.map((member: any, index: number) => {
        console.log(member);
        const isAdmin = member.isAdmin + "" === ENUM_KIND_OF_STATUS.ACTIVE;
        console.log('member ' + index + ": " + isAdmin)
        return (
          <>
            <div className="bodycreategroup-main-body-selecteduserpanel">
              <CircleAvatarScreen
                src={member.user.avatar}
                isOnline={member.status === ENUM_KIND_OF_STATUS.ACTIVE}
                class=""
                width="44px"
                height="44px"
              ></CircleAvatarScreen>
              <div className="body-main-detail-group-member-username">
                <span>
                  { member.user.userName }
                </span>
                {
                  isAdmin && (
                    <CustomBadgeScreen text="admin" class="margin-left-8"></CustomBadgeScreen>
                  )
                }
              </div>
              <div className="bodycreategroup-main-body-option">
                {
                  isAdmin ?
                    <></>
                    : <MainPopupScreen context={eleDetailPopup}>
                      {/* <div>
                        <img src={iconMoreVertical} className="descriptionchatlist-icon-penedit" alt="" />
                      </div> */}
                        <div className="cursor-pointer flex-center img-24">
                          <div className="vertical3dots"></div>
                      </div>
                    </MainPopupScreen>
                }
              </div>
            </div>
          </>
        )
      })
    }
    return <div></div>
  }
  const showListImageInGroup = () => {
    if (imageInGroup.length > 0) {
      return imageInGroup.map((image: any, index: number) => {
        image.index = index;
        return <img alt="" onClick={() => { toggleOverlay(image) }} src={getApiUrl(image.name)} key={index}></img>;
      }
      )
    }
    return <div></div>
  }
  const showLinkInGroup = () => {
    if (linkInGroup.length > 0) {
      return linkInGroup.map((link: any, index: number) => {
        return <FileContextChatScreen isFile={false} isCurrent={true} context={link.message} datetime=""></FileContextChatScreen>
      })
    }
    return <div></div>
  }

  const showFileInGroup = () => {
    if (fileInGroup.length > 0) {
      return fileInGroup.map((item: any, index: number) => {
        return <FileContextChatScreen fileSize={item.fileSize} isFile={true} isCurrent={true} context={getApiUrl(item.name)} datetime=""></FileContextChatScreen>
      })
    }
    return <div></div>
  }

  const showMainBody = () => {
    switch (activeLi) {
      case ENUM_KIND_OF_CONVERSATIONDETAIL.MEMBER:
        return (
          <div className="bodyconversationdetail-main-body-tab bodyconversationdetail-main-body-fileandlink">
            {
              showMemberInGroup()
            }
          </div>
        )
      case ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE:
        return (
          <div className="bodyconversationdetail-main-body-tab bodyconversationdetail-main-body-image">
            {
              showListImageInGroup()
            }
          </div>
        )
      case ENUM_KIND_OF_CONVERSATIONDETAIL.FILE:
        return (
          <div className="bodyconversationdetail-main-body-tab bodyconversationdetail-main-body-fileandlink">
            {
              showFileInGroup()
            }
          </div>
        )
      case ENUM_KIND_OF_CONVERSATIONDETAIL.LINK:
        return (
          <div className="bodyconversationdetail-main-body-tab bodyconversationdetail-main-body-fileandlink">
            {
              showLinkInGroup()
            }
          </div>
        )
      default:
        break;
    }
  }

  const eleUl = (
    <ul className="bodyconversationdetail-main-header-li--small">
      <li
        className={"icon-svg--hover " + (activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.MEMBER ? "bodyconversationdetail-main-header-li--active" : "")}
        onClick={() => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.MEMBER) }}
      >
        Thành viên
        </li>
      <li
        className={"icon-svg--hover " + (activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE ? "bodyconversationdetail-main-header-li--active" : "")}
        onClick={() => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE) }}
      >
        Hình ảnh
        </li>

      <li
        className={"icon-svg--hover " + (activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.FILE ? "bodyconversationdetail-main-header-li--active" : "")}
        onClick={() => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.FILE) }}
      >
        Tài liệu
        </li>
      <li
        className={"icon-svg--hover " + (activeLi === ENUM_KIND_OF_CONVERSATIONDETAIL.LINK ? "bodyconversationdetail-main-header-li--active" : "")}
        onClick={() => { onChangeActiveLi(ENUM_KIND_OF_CONVERSATIONDETAIL.LINK) }}
      >
        Link
        </li>
    </ul>
  )

  const body: IBodyConversationDetail = {
    showMainBody: showMainBody,
    eleUl: eleUl
  }

  const eleContextSignout = (close: any) => {
    return (
      <div className="popupsignoutgroup-container">
        <div className="popupsignoutgroup-text">
          <p>Bạn chắc chắn thực hiện hành động này ?</p>

        </div>
        <div className="popupsignoutgroup-button">
          <button onClick={close} className="btn-outline" >Hủy</button>
          <button>Xác nhận</button>
          {/* <CustomButtonScreen onClick={close} text={"Hủy"} class="default"></CustomButtonScreen> */}
          {/* <CustomButtonScreen onClick={null} text={"Xác nhận"} class="primary"></CustomButtonScreen> */}
        </div>
      </div>
    )
  }

  const eleContent: React.ReactElement = (
    <AddMemberScreen></AddMemberScreen>
  );

  const eleOption: React.ReactElement = (
    <>
      <ModalScreen open={false} headerContent={"Thêm thành viên"} context={eleContent} hasPadding={false}>
        <div>
          <IconCirclePanel srcIcon={iconUserLineAdd} class="" padding="0.8rem"></IconCirclePanel>
          <p>Thêm thành viên</p>
        </div>
      </ModalScreen>
      <div>
        <IconCirclePanel srcIcon={iconnoti} class="" padding="0.8rem" onClick={toggleNoti}></IconCirclePanel>
        <p>
          {iconnoti === iconBellNotificationOn ? "Thông báo" : "Tắt thông báo"}
        </p>
      </div>
      <ModalScreen open={false} headerContent={"Xác nhận rời khỏi nhóm"} contextHasClose={eleContextSignout} hasPadding={false}>
        <div>
          <IconCirclePanel srcIcon={iconSignoutRight} class="" padding="0.8rem"></IconCirclePanel>
          <p>Thoát nhóm</p>
        </div>
      </ModalScreen>
      <ModalScreen open={false} headerContent={"Xác nhận rời khỏi nhóm"} contextHasClose={eleContextSignout} hasPadding={false}>
        <div>
          <IconCirclePanel srcIcon={iconTrashDeleteBin} class="" padding="0.8rem"></IconCirclePanel>
          <p>Xóa nhóm</p>
        </div>
      </ModalScreen>
    </>
  );

  // const eleSearch: React.ReactElement = (
  //     <>
  //         <img src={ iconSearchLoupe } alt=""/>
  //         <img src={ iconMoreVertical } alt=""/>
  //     </>
  // );

  const header: IHeaderConversationDetail = {
    name: groupDetail.title,
    title: memberInGroup.length + " thành viên",
    srcImage: getApiUrl(groupDetail.avatar),
    eleOption: eleOption,
  }

  return (
    <>
      <ConversationDetailScreen header={header} body={body}></ConversationDetailScreen>
      {
        isOpenOverlay && (<ImageOverlayScreen close={toggleOverlay} miniImageList={miniImageList} mainMiniImage={mainImage}></ImageOverlayScreen>)
      }
    </>
  );
}

export default GroupDetailScreen;
