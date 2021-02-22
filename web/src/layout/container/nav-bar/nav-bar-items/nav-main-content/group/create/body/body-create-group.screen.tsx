import React from 'react';
import { ENUM_KIND_OF_ICONPANEL } from '../../../../../../../../libraries/Enum/icon-panel';
import { ENUM_KIND_OF_STATUS } from '../../../../../../../../libraries/Enum/status';
import CircleAvatarScreen from '../../../../../../../../libraries/Features/circle-avtar/circle-avatar.screen';
import CustomInputScreen from '../../../../../../../../libraries/Features/custom-input/custom-input.screen';
import { ICompanyMember } from '../../../../nav-company-members/company-member/company-member.props';
import InfiniteScrollCompanyMemberListScreen from '../../../../nav-company-members/infinite-scroll/infinite-scroll-company-member-list.screen';
import BodyCreateGroupAdapter from './body-create-group.adapter';
import './body-create-group.scss';


const iconSearchLoupe = require('../../../../../../../../libraries/Icons/search-loupe.svg').default;

const styleCustomInput = {
    backgroundImage:`url('${ iconSearchLoupe }')`,
    backgroundPosition:'2% 50%',
    padding:'12px 20px 12px 40px',
    borderRadius:'0.7rem',
    fontSize:'1rem',
}

function BodyCreateGroupScreen(props: any) {

    const {
        hasFooter , 
        setSelectedUser,
        setSelectedUserByCheckbox,
        selectedUseridList,
        removeSelectedUser,
        companyMemList , setCompanyMemList
    } = BodyCreateGroupAdapter(props);


    const iconpanel = ENUM_KIND_OF_ICONPANEL.CREATE_GROUP;

    const { createChatRoom } = props;



    const showSelectedUserPanel = (memberList: ICompanyMember[]) =>{
        const length = memberList.length
        if(length > 0){
            return memberList.map((member: ICompanyMember , index: number) =>{
                return  <div key={ index } className="bodycreategroup-main-body-selecteduserpanel cursor-pointer" onClick={ () => { setSelectedUser(member.id) } }>
                    <CircleAvatarScreen 
                        src={ member.avatar }
                        isOnline={ member.status === ENUM_KIND_OF_STATUS.ACTIVE }
                        class="img-48"
                        width=""
                        height=""
                        hasCursor={ true }
                    ></CircleAvatarScreen>
                    <p>
                        { member.lastName + " " + member.firstName }
                    </p>
                    <input type="checkbox" name={ member.id } className="bodycreategroup-main-body-checkbox" onChange={ setSelectedUserByCheckbox } checked={ selectedUseridList.some((id: string) => id === member.id) } ></input>
                </div>
            })
        }
    }

    const showSelectedUserPanelInFooter = () => {
        return selectedUseridList.map((id:string , index: number) => {
            const member = companyMemList.find((member:ICompanyMember) => member.id === id);
            return <CircleAvatarScreen 
                key={ index }
                src={ member?.avatar || "" }
                isOnline={ member?.status === ENUM_KIND_OF_STATUS.ACTIVE || false }
                canRomove={ true }
                class=""
                width="42px"
                height="42px"
                onRemove={ () =>{ removeSelectedUser(id)}}
            ></CircleAvatarScreen>
        })
    }

    return (
        <div className="bodypanel-container bodycreategroup">
            <div className="bodypanel-detail-container bodycreategroup-container">
                <div className={"bodycreategroup-main " + (hasFooter ? "bodycreategroup-main--hasfooter" : "")}>
                    <span className="subheading-semibold padding-12">Chọn thành viên</span>
                    <div className="bodycreategroup-main-body padding-12">
                        <CustomInputScreen style={ styleCustomInput } hasClearText={ true } placeHolder="Nhập tên người cần tìm kiếm" class="" isMultiline={ false }  isTextArea={ false }></CustomInputScreen>

                        <InfiniteScrollCompanyMemberListScreen
                            className={ "bodycreategroup-main-body-selecteduser" }
                            showCompanyMemberList={ showSelectedUserPanel }
                            iconpanel = { iconpanel }
                            setCompanyMemList={ setCompanyMemList }
                        ></InfiniteScrollCompanyMemberListScreen>
                    </div>
                </div>
                {
                    hasFooter && (
                        <div className="bodycreategroup-footer">
                            <div className="bodycreategroup-footer-selecteduserpanel cursor-pointer">
                                {
                                    showSelectedUserPanelInFooter()
                                }
                            </div>

                            <button onClick={ createChatRoom }>Tạo nhóm</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default BodyCreateGroupScreen;
