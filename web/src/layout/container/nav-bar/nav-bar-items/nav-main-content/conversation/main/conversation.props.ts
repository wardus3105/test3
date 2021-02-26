
export interface IResponseMess {
    messageId: string;
    type: number,
    context: string,   
    userName: string 
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
    user: IUser,
    chatRoomId?: string,
    attachments?: IAttachment[],
    createdAt: any,
    parentId?: string,
    statusVideoCall?:string
}

interface IUser{
    userName:string,
    status: string,
    id?:string,
}

export interface IAttachment{
    contentType: string,
    name: string,
    type: string,
}

