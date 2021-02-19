import GoBackButtonAdapter from "./goback-button.adapter";
import "./goback-button.scss";

const iconArrowLeft = require("../../Icons/arrow-left.svg").default;

function GoBackButtonScreen(){
    const {
        redirectToLastPage
    } = GoBackButtonAdapter()

    return (
        <div className="gobackbutton-container cursor-pointer">
            <div onClick={ redirectToLastPage }>
                <img src={ iconArrowLeft } alt="" ></img>
                <span className="margin-left-8">Quay lại</span>
            </div>
        </div>
    )
}

export default GoBackButtonScreen;