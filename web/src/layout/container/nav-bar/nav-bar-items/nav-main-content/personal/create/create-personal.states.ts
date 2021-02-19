import { useState } from "react";

function CreatePersonalStates(){
    const [title , setTitle] = useState<string>("");
    const [avatarTemp , setAvatarTemp] = useState<string>("");
    const [avatar , setAvatar] = useState<any>(null);
    const [createBy , setCreateBy] = useState<string>("");
    const [userId , setUserId] = useState<any>([]);

    return {
        title , setTitle,
        avatar , setAvatar,
        avatarTemp , setAvatarTemp,
        createBy , setCreateBy,
        userId , setUserId
    }
}

export default CreatePersonalStates;