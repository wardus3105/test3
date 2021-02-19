/* 
    Created by longdq
*/

import { IMessage } from 'react-native-gifted-chat';
import { IHyperMessage } from '../../types/message';

export interface ChatDetailStates {
  dataListMessage: IHyperMessage[];
  currentMessage: IHyperMessage;
  showHi: boolean;
}
