import { useState } from "react";

function ChatInputStates() {
    const [pathFileList , setPathFileList] = useState<string[]>([]);
    const [file , setFile] = useState<any>(null);
    const [isMultilineText, setIsMultilineText] = useState<Boolean>(false);
    const [isFocused, setIsFocused] = useState<Boolean>(false);
    const [message, setMessage] = useState<string>("");

    return {
        pathFileList , setPathFileList,
        isMultilineText, setIsMultilineText,
        message, setMessage,
        isFocused, setIsFocused,
        file , setFile
    }
}

export default ChatInputStates;
