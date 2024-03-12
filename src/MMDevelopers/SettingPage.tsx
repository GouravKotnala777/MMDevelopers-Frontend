import {BiLeftArrowAlt } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopButtons from "./components/TopButtons";
import { MouseEventHandler } from "react";
import Skeleton from "./components/Skeleton";


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


const SettingPage = ({user}:ProsType) => {
    const navigate = useNavigate();



    return(
        <SettingPageBackground>
            <TopButtons firstBtn={BiLeftArrowAlt} firstBtnOnClick={() => navigate(-1)} />

            <div className="settings_cont">
                {
                    user?.role === "admin" ?
                        <NavLink to="/logout" className="setting_navlink" >Logout</NavLink>
                        :
                        ""

                }
                <NavLink to="/theme" className="setting_navlink" >Theme</NavLink>
                <NavLink to="/language" className="setting_navlink" >Language</NavLink>
            </div>
        </SettingPageBackground>
    )
};

export default SettingPage;

const SettingPageBackground = styled.section`
// border:2px solid red;
   
    .settings_cont{
        // border:2px solid blue;
        display:flex;
        flex-direction:column;
    }
        .settings_cont .setting_navlink{
            // border:2px solid green;
            margin:10px;
            text-align:center;
            text-decoration:none;
            color:black;
        }
`;