
/* 
    Created by longdq
*/

import { fetch, post, put, deletes } from "core/networking/api-helper"

export default class ViewPhotoServices {
  private static instance: ViewPhotoServices;

  static getInstance(): ViewPhotoServices {
    if (!ViewPhotoServices.instance) {
      ViewPhotoServices.instance = new ViewPhotoServices();
    }
    return ViewPhotoServices.instance;
  }
}


