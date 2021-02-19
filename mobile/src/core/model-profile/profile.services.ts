
/* 
    Created by longdq
*/

import { fetch, post, put, deletes } from "core/networking/api-helper"

export default class ProfileServices {
  private static instance: ProfileServices;

  static getInstance(): ProfileServices {
    if (!ProfileServices.instance) {
      ProfileServices.instance = new ProfileServices();
    }
    return ProfileServices.instance;
  }
}


