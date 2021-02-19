
/* 
    Created by longdq
*/

import { fetch, post, put, deletes } from "core/networking/api-helper"

export default class ProfileOthersServices {
  private static instance: ProfileOthersServices;

  static getInstance(): ProfileOthersServices {
    if (!ProfileOthersServices.instance) {
      ProfileOthersServices.instance = new ProfileOthersServices();
    }
    return ProfileOthersServices.instance;
  }
}


