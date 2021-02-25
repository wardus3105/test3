import React from 'react';
import getApiUrl from '../../../../../../../../../libraries/Functions/get-api-url';
import ImageContextChatAdapter from './image-context-chat.adapter';
import { IImageContextChat } from './image-context-chat.props';
import './image-context-chat.scss';

function ImageContextChatScreen(props : IImageContextChat){
    const list = ImageContextChatAdapter(props) || [];
    const showImages = () =>{
        return list.map((image: any , index: number) =>{
            const url = getApiUrl(image.name)
            return <img src={ url } alt="" key={index}></img>
        })
    }

    return (
        <div className={"imagechat-container " +  (props.isCurrent ? "imagechat-current" : "")}>
            {
                showImages()
            }
        </div>
    )
}

export default ImageContextChatScreen;