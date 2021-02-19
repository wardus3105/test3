import useWindowSize from "../../libraries/Hooks/useWindowSize";
import BodyStates from "./body.states";

function BodyAdapter(props: any){
    const { activedIcon , setActivedIcon } = BodyStates()
    const { height } = useWindowSize();
    const { hasNavbar } = props;
  
    const eleHeader: any = document.querySelector('.header-container');
    const heightHeader = eleHeader ? eleHeader.offsetHeight : 50
    const styleInline = {
      height: height- heightHeader
    }

    return {
        activedIcon , setActivedIcon,
        hasNavbar,
        styleInline
    }
}

export default BodyAdapter;