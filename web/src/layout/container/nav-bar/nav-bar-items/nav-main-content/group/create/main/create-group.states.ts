import { useState } from "react";

function CreateGroupStates(){
    const [title , setTitle] = useState<string>("");
    const [slogan , setSlogan] = useState<string>("");
    const [avatarTemp , setAvatarTemp] = useState<string[]>([]);
    const [avatar , setAvatar] = useState<any>(null);
    const [createBy , setCreateBy] = useState<string>("");
    const [memberIdList , setMemberIdList] = useState<string[]>([]);

    return {
        title , setTitle,
        avatar , setAvatar,
        avatarTemp , setAvatarTemp,
        createBy , setCreateBy,
        memberIdList , setMemberIdList,
        slogan , setSlogan
    }
}

export default CreateGroupStates;