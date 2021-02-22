import React from 'react';
import './text-context-chat.scss';

function TextContextChatScreen(props : any){
    const { context } = props;

    const showContext = () =>{
        const rows = context.split("\n");
        if(rows.length > 1){
            return rows.map((row: string) =>{
                if(row){
                    return <span>
                        {row}
                        <br></br>
                    </span>;
                }
                return <></>;
            })
        }
        return <span className="body-regular">
            {context}
        </span>;
    }

    if(context){
        return (
            <div className={ "padding-12 " + (props.isCurrent ? "currentchat-context" : "guestchat-context") }>
                { showContext() }    
                <span className="chat-time">
                    { props.datetime }
                </span>
            </div> 
        )
    }

    return <></>;
}

export default TextContextChatScreen;