import { useState } from "react";
import { IMiniImage } from "../../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.props";

function ChatListStates() {
    const [isMainLoading, setIsMainLoading] = useState<boolean>(true);
    const [userid, setUserid] = useState<string>("");
    const [roomIdz, setRoomIdz] = useState<string>("");
    const [chatList, setChatList] = useState<any[]>([]);
    const [bottom , setBottom] = useState<string>("60");
    const [isOpenOverlay , setIsOpenOverlay] = useState<boolean>(false);
    const [miniImageList , setMiniImageList] = useState<any[]>([]);
    const [mainImage , setMainImage] = useState<IMiniImage>({
      index:-1,
      author:"",
      srcImage:"",
      id:""
    })

    return {
        isMainLoading, setIsMainLoading,
        userid, setUserid,
        chatList, setChatList,
        roomIdz, setRoomIdz,
        bottom , setBottom,
        isOpenOverlay , setIsOpenOverlay,
        miniImageList , setMiniImageList,
        mainImage , setMainImage
    }
}

export default ChatListStates;
