import React from 'react';
import './current-chat.scss';

function CurrentChatScreen(props : any){
    return (
        <div className="currentchat-container margin-4">
            <span>huy</span>
            { props.children }
        </div>
    )
}

export default CurrentChatScreen;