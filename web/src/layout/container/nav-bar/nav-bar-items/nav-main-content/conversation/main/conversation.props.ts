
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
    messageType: number,
    messageStatus: string
    userId: string,
    user: IUser,
    chatRoomId?: string,
    attachments?: IAttachment[],
    createdAt: any,
}

interface IUser{
    userName:string,
    status: string,
    id?:string,
}

export interface IAttachment{
    contentType: number,
    name: string,
    type: number,
}

