import { useState } from "react";
import { ENUM_KIND_OF_CONVERSATIONDETAIL } from "../../../../../../../libraries/Enum/conversation-detail";
import { IMiniImage } from "../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.props";



function GroupDetailStates() {
    const [groupDetail , setGroupDetail] = useState<any>({
        avatar: "",
        title: "",
        status: "",
        type: ""
    });
    const [memberInGroup , setMemberInGroup] = useState<any[]>([]);
    const [activeLi , setActiveLi] = useState<number>(ENUM_KIND_OF_CONVERSATIONDETAIL.MEMBER);
    const [isOpenOverlay , setIsOpenOverlay] = useState<boolean>(false);
    const [iconnoti , setIconnoti] = useState("");
    const [mainImage , setMainImage] = useState<IMiniImage>({
      index:-1,
      author:"",
      srcImage:"",
    })



    return {
        activeLi , setActiveLi,
        isOpenOverlay , setIsOpenOverlay,
        iconnoti , setIconnoti,
        mainImage , setMainImage,
        memberInGroup , setMemberInGroup,
        groupDetail , setGroupDetail
    }
}

export default GroupDetailStates;