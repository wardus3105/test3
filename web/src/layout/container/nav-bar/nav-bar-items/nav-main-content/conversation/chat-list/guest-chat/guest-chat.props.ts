import { IResponseMess } from "../../main/conversation.props";
import { IUser } from "../main/chat-list.props";


export interface IGuestChat{
    id:number,
    user: IUser,
    kindOfMess: number,
    context: string,
    children: React.ReactNode,
    responseMess: IResponseMess,
    setResponseMess:any,
}