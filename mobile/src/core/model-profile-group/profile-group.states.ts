/* 
    Created by longdq
*/

import { User } from 'types/user';

export interface ProfileGroupStates {
  dataInfoGr: ModelInfoGr;
  index: number;
  routes: Router[];
}

export interface ModelInfoGr {
  users: User[];
  avatar_url: string;
}

export interface Router {
  key: string;
  title: string;
}
