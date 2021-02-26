import React from 'react';
import { IFileChat } from './file-context-chat.props';
import './file-context-chat.scss';

const iconLink = require('../../../../../../../../../libraries/Icons/link.svg').default;
const iconDownloadSaveUpload = require('../../../../../../../../../libraries/Icons/download-save-upload.svg').default;
const iconShareArrowSquare = require('../../../../../../../../../libraries/Icons/share-arrow-square.svg').default;
const iconGimFile = require('../../../../../../../../../libraries/Icons/gim-file.svg').default;

function FileContextChatScreen(props : IFileChat){

    const redirectWeb = (link: string) =>{
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
        <div className="filechat-container">
            <img src={ props.isFile ? iconGimFile : iconLink } alt="link" className="filechat-container-image cursor-pointer icon-svg--hover"></img>
            <div className="filechat-maincontext">
                <div className="filechat-context">
                    <h5 className="width-200 text-overflow-ellipsis">
                        <a href={ props.context } target="_blank" rel="noreferrer">
                            { props.context }
                        </a>
                    </h5>
                    <div className="app-mainfont">
                        <h5>{ props.fileSize}</h5>
                    </div>
                </div>
                <div className="filechat-iconbutton">
                    <img 
                    src={ props.isFile ? iconDownloadSaveUpload : iconShareArrowSquare } 
                    alt="link" 
                    className="cursor-pointer"
                    onClick={ () =>{ redirectWeb(props.context)} }
                    ></img>
                </div>
            </div>

        </div>
    )
}

export default FileContextChatScreen;