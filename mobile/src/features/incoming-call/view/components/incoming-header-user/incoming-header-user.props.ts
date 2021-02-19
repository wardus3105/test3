import { User } from '../../../../../types/user';
import { KindOfMsg } from '../../../../../types/message';
/* 
    Created by thaolt
*/

export interface IncomingHeaderUserProps {
  onBack: () => void;
  userInfo: User
  typeCall: KindOfMsg
}
