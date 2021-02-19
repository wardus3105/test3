import { useEffect } from "react";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../libraries/Enum/status-code";
import { IMiniImage } from "../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.props";
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath";
import useKeyDown from "../../../../../../../libraries/Hooks/useKeyDown";
import GroupDetailServices from "./group-detail.services";
import GroupDetailStates from "./group-detail.states";

const iconBellNotificationOn = require("../../../../../../../libraries/Icons/bell-notification-on.svg").default;
const iconBellNotificationOff = require("../../../../../../../libraries/Icons/bell-notification-off.svg").default;

function GroupDetailAdapter() {
    const {
        activeLi , setActiveLi,
        isOpenOverlay , setIsOpenOverlay,
        iconnoti , setIconnoti,
        mainImage , setMainImage,
        memberInGroup , setMemberInGroup,
        groupDetail , setGroupDetail
    } = GroupDetailStates();

    const closeImageOverlayByEscKey = (e: KeyboardEvent) =>{
        if(e.keyCode === 27){
          setIsOpenOverlay(false);
        }
    }

    useKeyDown(closeImageOverlayByEscKey)

    const roomId = useIdInPath(3)

    useEffect(() => {
        const getData = async () => {
            const response = await GroupDetailServices().getInstance().getGroupDetail(roomId);
            if(response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS){
                const result = response.data.result;
                setMemberInGroup(result.chatroom_member);
                setGroupDetail(result.chatroom)
            }
        }
        getData();
    },[setMemberInGroup , setGroupDetail , roomId])
    
    useEffect(() =>{
        setIconnoti(iconBellNotificationOn)
    },[setIconnoti])
    
    // useEffect(() =>{
    //     window.addEventListener('keydown', closeImageOverlayByEscKey );
    
    //     return() =>{
    //         window.removeEventListener('keydown', closeImageOverlayByEscKey );
    //     }
    // })
    
    const onChangeActiveLi = (num: number) =>{
        setActiveLi(num);
    }
    
    const toggleOverlay = (miniImage: IMiniImage) =>{
        setIsOpenOverlay(prev => !prev);
        setMainImage(miniImage);
    }
    
    const toggleNoti = ()=>{
        if(iconnoti === iconBellNotificationOn){
          setIconnoti(iconBellNotificationOff)
        } else{
          setIconnoti(iconBellNotificationOn)
        }
    }

    return {
        toggleNoti,
        activeLi,
        toggleOverlay,
        iconnoti,
        isOpenOverlay,
        mainImage,
        onChangeActiveLi,
        memberInGroup,
        groupDetail
    }
}

export default GroupDetailAdapter;


