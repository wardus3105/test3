import { ENUM_KIND_OF_CONVERSATIONDETAIL } from './../../../../../../../libraries/Enum/conversation-detail';
import { useEffect } from "react";
import { ENUM_KIND_OF_STATUS_CODE } from "../../../../../../../libraries/Enum/status-code";
import { IMiniImage } from "../../../../../../../libraries/Features/image-overlay-full-screen/image-overlay-full-screen.props";
import useIdInPath from "../../../../../../../libraries/Hooks/useIdInPath";
import useKeyDown from "../../../../../../../libraries/Hooks/useKeyDown";
import GroupDetailServices from "./group-detail.services";
import GroupDetailStates from "./group-detail.states";

function GroupDetailAdapter() {
    const {
        activeLi, setActiveLi,
        isOpenOverlay, setIsOpenOverlay,
        hasNoti , setHasNoti,
        mainImage, setMainImage,
        imageInGroup, setImageInGroup,
        memberInGroup, setMemberInGroup,
        linkInGroup, setLinkInGroup,
        fileInGroup, setFileInGroup,
        groupDetail, setGroupDetail,
        miniImageList , setMiniImageList
    } = GroupDetailStates();

    const roomId = useIdInPath(3)

    useEffect(() => {
        const getData = async () => {
            
            const response = await GroupDetailServices().getInstance().getGroupDetail(roomId);
            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                const result = response.data.data;
                setMemberInGroup(result);
            }

            const response1 = await GroupDetailServices().getInstance().getInforGroupDetail(roomId);
            if (response1 && response1.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                const result1 = response1.data.data;
                setGroupDetail(result1[0]);
            }
        }
        getData();
    }, [setMemberInGroup, setGroupDetail, roomId])


    // useEffect(() =>{
    //     window.addEventListener('keydown', closeImageOverlayByEscKey );

    //     return() =>{
    //         window.removeEventListener('keydown', closeImageOverlayByEscKey );
    //     }
    // })

    const onChangeActiveLi = async (num: number) => {
        setActiveLi(num);
        switch (num) {
            case ENUM_KIND_OF_CONVERSATIONDETAIL.LINK:
                const response2 = await GroupDetailServices().getInstance().getLinkGroupDetail(roomId);
                if (response2 && response2.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    const result2 = response2.data.data;
                    setLinkInGroup(result2);
                }
                break;
            case ENUM_KIND_OF_CONVERSATIONDETAIL.IMAGE:
                const response3 = await GroupDetailServices().getInstance().getAttachmentImageGroupDetail(roomId);
                if (response3 && response3.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    const result3 = response3.data.data;
                    setImageInGroup(result3);
                    setMiniImageList(result3);
                }
                break;
            case ENUM_KIND_OF_CONVERSATIONDETAIL.FILE:
                const response4 = await GroupDetailServices().getInstance().getAttachmentFileGroupDetail(roomId);
                if (response4 && response4.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    const result4 = response4.data.data;
                    setFileInGroup(result4);
                }
                break;
        }
    }

    const toggleOverlay = (miniImage: IMiniImage) => {
        setIsOpenOverlay(prev => !prev);
        setMainImage(miniImage);
    }


    return {
        activeLi,
        toggleOverlay,
        hasNoti , setHasNoti,
        isOpenOverlay,
        mainImage,
        onChangeActiveLi,
        memberInGroup,
        imageInGroup,
        linkInGroup,
        groupDetail,
        fileInGroup,
        miniImageList
    }
}

export default GroupDetailAdapter;


