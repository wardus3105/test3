
/* 
    Created by tuPC
*/

import { fetch, post, put, deletes } from "core/common/networking/api-helper"

export default class TestUiServices {
  private static instance: TestUiServices;

  static getInstance(): TestUiServices {
    if (!TestUiServices.instance) {
      TestUiServices.instance = new TestUiServices();
    }
    return TestUiServices.instance;
  }
}


