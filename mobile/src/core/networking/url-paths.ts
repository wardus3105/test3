export const URL_PATHS = {
  CHECK_TICKET:
    'https://sso.hyperlogy.com/cas/serviceValidate?pgtUrl=https%3A%2F%2Fhyperlogy.ihcm.vn%2Fihcm%2Fj_spring_cas_proxyreceptor.hyper&ticket=my_ticket&service=https%3A%2F%2Fhyperlogy.ihcm.vn%2Fihcm%2F',
  MOBILE_LOGIN: '/mobileLogin',
  //TODO
  BASE_URL_IHCM: 'https://@domain/ihcm/',
  CAS_TGT: 'https://sso.hyperlogy.com/cas/v1/tickets',
  TOKEN_IHCM: 'https://@domain/ihcm/api/auth/validateCasTicket/?ticket=@ticket',
  PROFILE_IHCM: 'https://@domain/ihcm/api/employee/detailProfile',
  UPDATE_DEVICE_INFO: '/api/devices',
  SYNC_USER_IHCM: '/api/user',
  UPDATE_DEVICE_ID: '/api/update-device',
  LIST_ROOM_CHAT: '/api/chat-rooms',
  // SEARCH_USER: '/api/all-user',

  UPDATE_STATUS_USER: '/users/updateStatus',
  LIST_USER: '/users/suggests',
  LIST_MESSAGE: '/messengers/suggestByChat',
  INSERT_MESSAGE: '/messengers/insert',
  CREATE_GROUP: '/chats/addChat',
  REQUEST_TO_USER: '/chats/requestToUser',
  CREATE_ROM_CHAT: '/chats/createRoom',
  UPLOAD_FILE: '/uploadMultiple',
  UPDATE_STATUS_VIDEO_CALL: '/messengers/updateStatusVideoCall',
  MESSAGE: '/messengers',
  CHAT_INFO: '/chats/infoChat',
  REMOVE_GROUP: '/users/removeUser',
  ADD_MEMBERS: '/chats/addMembers',
};
