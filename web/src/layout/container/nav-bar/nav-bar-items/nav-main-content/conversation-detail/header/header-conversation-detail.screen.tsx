import React from 'react';
import CircleAvatarScreen from '../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import GoBackButtonScreen from '../../../../../../../libraries/Features/goback-button/goback-button.screen';

import { IHeaderConversationDetail } from './header-conversation-detail.props';
import './header-conversation-detail.scss';


function HeaderConversationDetailScreen(props : IHeaderConversationDetail) {

    return (
        <div className="headerconversationdetail-container">
            <div className="headerconversationdetail-top">
                <GoBackButtonScreen></GoBackButtonScreen>
                <div className="detail-title">
                    <h4>
                        {
                            props.name 
                        }
                    </h4>
                    <span>
                        {
                            props.title 
                        }
                    </span>
                </div>
            </div>
            <div className="headerconversationdetail-main container">
                <div className="headerconversationdetail-avatar">
                    <CircleAvatarScreen
                        src={ props.srcImage }
                        isOnline={false}
                        class={"headerconversationdetail-avatar-image img-40"}
                    ></CircleAvatarScreen>
                </div>
                <div className="headerconversationdetail-option">
                    {
                        props.eleOption
                    }
                </div>
            </div>
        </div>
    );
}

export default HeaderConversationDetailScreen;
