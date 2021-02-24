
/* 
    Created by thaolt
*/

import { fetch, post, put, deletes } from "core/common/networking/api-helper"

export default class TestServices {
  private static instance: TestServices;

  static getInstance(): TestServices {
    if (!TestServices.instance) {
      TestServices.instance = new TestServices();
    }
    return TestServices.instance;
  }
}


