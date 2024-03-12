import { AiFillBoxPlot, AiOutlineBoxPlot, AiOutlineFunnelPlot, AiOutlineOrderedList, AiOutlineTransaction } from "react-icons/ai";
import { BiHomeSmile, BiLogIn, BiLogOut } from "react-icons/bi";
import { IoIosPeople, IoMdSearch} from "react-icons/io";
import { RiDashboardLine, RiSettings5Line, RiShoppingBagLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface User {
    name?:string;
    email?:string;
    pic?:string;
    gender?:string;
    role?:string;
    dob?:string;
    _id?:string;
};

interface ProsType {
    user:User|null;
}


const Header = ({user}:ProsType) => {
    console.log(user);
    console.log(user?._id);
      
    
    return(
        <HeaderBackground>
            <div className="header_logo">MMDevelopers</div>
            <nav className="header_nav">
                {
                    user?._id ? 
                    (<>
                        <Link to="/"><BiHomeSmile className="header_icons"/></Link>
                        <Link to="/logout" className="header_icons"><BiLogOut/></Link>
                        <Link to="/plot" className="header_icons"><AiOutlineBoxPlot/></Link>
                        {
                            user?.role === "admin" && 
                            (<>
                                <Link to="/client"><IoIosPeople className="header_icons"/></Link>
                                <Link to="/payment"><AiOutlineTransaction className="header_icons"/></Link>
                            </>)
                        }
                    </>)
                    :
                    (<>
                        <Link to="/"><BiHomeSmile className="header_icons"/></Link>
                        <Link to="/login" className="header_icons"><BiLogIn/></Link>
                    </>)
                }
            </nav>
            <nav className="header_access_bar">
                {
                    !user?._id && <Link to="/login" className="header_icons"><BiLogIn/></Link>
                }
                <Link to="/search/client" className="header_icons"><IoMdSearch/></Link>
                <Link to="/setting" className="header_icons"><RiSettings5Line/></Link>
            </nav>
        </HeaderBackground>
    )
}

export default Header;

const HeaderBackground = styled.section`
// border:2px solid blue;
display:flex;
justify-content:space-between;
align-items:center;
background:linear-gradient(90deg, rgb(255, 49, 83), rgb(255, 118, 59));
z-index:1;
padding:0 4px;

    .header_logo{
        color:white;
    }
    .header_nav{
        // border:2px solid black;
        min-width:40%;
        max-width:70%;
        display:flex;
        justify-content:space-around;
        // align-items:center;
        color:white;
        position:relative;
    }
    .header_access_bar{
        display:none;
    }
    .header_icons{
        color:white;
        font-size:20px;
    }

@media screen and (width <= 600px){
    .header_nav{
        display:none;
    }
    .header_access_bar{
        // border:2px solid red;
        min-width:40%;
        max-width:70%;
        display:flex;
        justify-content:flex-end;
        // justify-content:space-around;
        // align-items:center;
        color:white;
    }
}
`;