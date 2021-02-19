import { useEffect , useRef , ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import DescriptionChatListStates from './description-chat-list.states';
import DescriptionChatListServices from './description-chat-list.services';
import { ENUM_KIND_OF_STATUS_CODE } from '../../../../../../libraries/Enum/status-code';
import useEventListener from '../../../../../../libraries/Hooks/useEventListener';


function DescriptionChatListAdapter() {
    const {
        query, setQuery,
        page, setPage,
        totalPages , setTotalPages,
        isUpdating, setIsUpdating,
        descriptionChatList, setDescriptionChatList,
        activedDescriptionChat , setActivedDescriptionChat,
        hasSearch, setHasSearch,
        searchDescriptionChatList, setSearchDescriptionChatList
    } = DescriptionChatListStates();

    const history = useHistory();
    const typingTimeoutRef = useRef<any>(null);
    
    useEffect(() => {
        const getData = async () => {
            if(query){
                let formData = new FormData();
                formData.append('text', query);
                const response = await DescriptionChatListServices().getInstance().getDescriptionChatListByQuery(formData);
                if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                    setSearchDescriptionChatList(response.data.data);
                }
            } else{
                setSearchDescriptionChatList([]) 
            }
        }

        getData();
    }, [ query , setSearchDescriptionChatList ]);

    const onClick = (event: any) => {
        if(hasSearch){
            const id = event.target.id
            if(id !== "descriptionchatlist-input-index" && id !== "searchfield-container-index"){
                setHasSearch(false);
            }
        }
    }
    useEventListener('click', onClick);

    useEffect(() => {
        const getData = async () => {
            setIsUpdating(true);

            const response = await DescriptionChatListServices().getInstance().getDescriptionChatList(page);
            if (response && response.status === ENUM_KIND_OF_STATUS_CODE.SUCCESS) {
                setTotalPages(response.data.totalPages)
                setDescriptionChatList((prev) => [...prev, ...response.data.data]);
            }

            setIsUpdating(false)
        }

        getData();
    },[page , setDescriptionChatList , setTotalPages , setIsUpdating]);

    useEffect(() => {
        const setDescriptionChatIsAcTiveByPath = () =>{
            const currentPathName = history.location.pathname;
            const arrPath = currentPathName.split("/");
            if(arrPath){
                let id = arrPath[2];
                if(arrPath.length === 4 && arrPath[2] === "detail"){
                    id = arrPath[3];
                }
                setActivedDescriptionChat(id);
            }
        }

        setDescriptionChatIsAcTiveByPath();
    },[setActivedDescriptionChat , history.location.pathname])

    useEffect(() => {
        if(!hasSearch){
            setQuery("");
        }
    },[hasSearch , setQuery])

    
    const onChange = (e: ChangeEvent<HTMLInputElement>) =>{
        if(typingTimeoutRef.current){
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() =>{
            setQuery(e.target.value);
        },1e3);
    }

    const redirectToChatDetail = (id:string) => {
        const kind = "g";
        history.push(`/${kind}/${id}`);
        setActivedDescriptionChat(id);
    };

    return {
        onChange,
        activedDescriptionChat ,
        descriptionChatList,
        totalPages,
        hasSearch, setHasSearch,
        query , setQuery,
        searchDescriptionChatList,
        page , setPage ,
        isUpdating,
        redirectToChatDetail
    }
}

export default DescriptionChatListAdapter;
