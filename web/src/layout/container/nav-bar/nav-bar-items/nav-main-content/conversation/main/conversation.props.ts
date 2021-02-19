
export interface IResponseMess {
    kindOfMess: number,
    context: string,    
}

export interface IConversation{
    id: string,
    title: string,
    status: string,
    avatar: string,
    type: string,
    chats: IChat[],
}
export interface IChat{
    message: string,
    messageType: string,
    messageStatus: string
    userId: string,
    createdAt: string,
    user: IUser,
    attachments:IAttachment[],
    chatRoomId?: string
}

interface IUser{
    userName:string,
    lastLogin: string,
    status: string
}

interface IAttachment{
    contentType: string,
    name: string,
    type: string,
    status: string
}

