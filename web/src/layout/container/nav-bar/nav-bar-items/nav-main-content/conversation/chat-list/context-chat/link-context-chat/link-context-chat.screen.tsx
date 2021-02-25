import React from 'react';
import { IFileChat } from './link-context-chat.props';
import './file-context-chat.scss';

const iconLink = require('../../../../../../../../../libraries/Icons/link.svg').default;
const iconDownloadSaveUpload = require('../../../../../../../../../libraries/Icons/download-save-upload.svg').default;
const iconShareArrowSquare = require('../../../../../../../../../libraries/Icons/share-arrow-square.svg').default;
const iconGimFile = require('../../../../../../../../../libraries/Icons/gim-file.svg').default;

function LinkContextChatScreen(props: IFileChat) {

    const redirectWeb = (link: string) => {
        window.open(
            link,
            '_blank' // <- This is what makes it open in a new window.
        );
    }

    // useEffect(() =>{
    //     (() => {
    //         getLinkPreview('https://www.youtube.com/watch?v=MejbOFk7H6c')
    //         .then((data) => console.debug(data));
    //     })();
    // })



    return (
        <div className="linkchat-container">
            <img src={props.isFile ? iconGimFile : iconLink} alt="link" className="linkchat-container-image cursor-pointer icon-svg--hover"></img>
            <div className="linkchat-maincontext">
                <div className="linkchat-context">
                    <h5 className="width-200 text-overflow-ellipsis">
                        <a href={props.context} target="_blank" >
                            {props.context}
                        </a>
                    </h5>
                    <div className="app-mainfont">
                        <h5>{props.fileSize}</h5>
                    </div>
                </div>
                <div className="linkchat-iconbutton">
                    <img
                        src={props.isFile ? iconDownloadSaveUpload : iconShareArrowSquare}
                        alt="link"
                        className="cursor-pointer"
                        onClick={() => { redirectWeb(props.context) }}
                    ></img>
                </div>
            </div>

        </div>
    )
}

export default LinkContextChatScreen;