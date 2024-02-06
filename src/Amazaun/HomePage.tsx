import {FC, useState} from "react";
import naruto from "./naruto.jpg";
import styled from "styled-components";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Li } from "./components/AdminSideBar";
import { RiDashboardFill, RiShoppingBagFill } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import { AiFillFileText } from "react-icons/ai";
import { FaChartBar, FaChartLine, FaChartPie } from "react-icons/fa";
import { useLocation } from "react-router-dom";


const HomePage:FC = () => {
    const [isSideBarActive, setIsSideBarActive] = useState(false);
    const location = useLocation();
    const toggleNav = () => {
        const sidenav = document.getElementById('mySidenav') as HTMLDivElement;

        if (sidenav.style.left === '0px') {
            sidenav.style.left = '-100%';
            setIsSideBarActive(false);
        } else {
            sidenav.style.left = '0px';
            setIsSideBarActive(true);
        }
    };
    
    return(
        <HomePageBackground>
            <div className="sidenav" id="mySidenav">
                <aside className="admin_sidebar_aside">
                <div>
                    <h3 className="admin_sidebar_sub_heading">DASHBOARD</h3>
                    <ul>
                        <Li url="/admin/dashboard" location={location} Icon={RiDashboardFill} text="Dashboard" />
                        
                        <Li url="/admin/product" location={location} Icon={RiShoppingBagFill} text="Products" />
                        
                        <Li url="/admin/customer" location={location} Icon={IoIosPeople} text="Customers" />

                        <Li url="/admin/transaction" location={location} Icon={AiFillFileText} text="Transactions" />
                    </ul>
                    <hr/>
                    <h3 className="admin_sidebar_sub_heading">Charts</h3>
                    <ul>
                        <Li url="/admin/chart/bar" location={location} Icon={FaChartBar} text="Bar" />
                        
                        <Li url="/admin/chart/pie" location={location} Icon={FaChartPie} text="Pie" />
                        
                        <Li url="/admin/chart/line" location={location} Icon={FaChartLine} text="Line" />
                    </ul>
                    <hr/>
                    <h3 className="admin_sidebar_sub_heading">Apps</h3>
                    <ul>
                        <Li url="/admin/app/coupan" location={location} Icon={FaChartBar} text="Coupan" />
                        
                        <Li url="/admin/app/stopwatch" location={location} Icon={FaChartPie} text="Stop Watch" />
                        
                        <Li url="/admin/app/toss" location={location} Icon={FaChartLine} text="Toss" />
                    </ul>
                </div>
            </aside>
            </div>
            <div className="toggle_btn_cont">
                <button id="toggle-btn" onClick={toggleNav}>{isSideBarActive === true ? (<h1 style={{fontSize:"20px" , width:"20px"}}>X</h1>) : (<HamburgerIcon className="hhhh"/>)}</button>
            </div>
        </HomePageBackground>
    )
}

export default HomePage;

const HomePageBackground = styled.section`
font-family: Arial, sans-serif;
margin: 0;
padding: 0;
overflow-x: hidden;
display:none;
// z-index: 1;

    .sidenav {
        height: 100%;
        width: 100%;
        position: fixed;
        top: 0;
        left: -100%;
        background-color: white;;
        overflow-x: hidden;
        transition: 0.5s;
        padding-top: 60px;
        z-index:1;
    }

    .sidenav a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        font-size: 18px;
        color: #818181;
        display: block;
        transition: 0.3s;
    }

    .sidenav a:hover {
        color: #f1f1f1;
    }

    .toggle_btn_cont {
        position: fixed;
        left: 10px;
        top: 10px;
        // cursor: pointer;
        // border: none;
        // transition: 0.5s;
        border:2px solid blue;
        width:95%;
        background:white;
        z-index: 2;
    }
    #toggle-btn {
        // position: fixed;
        // left: 10px;
        // top: 10px;
        cursor: pointer;
        border: none;
        transition: 0.5s;
        // border:2px solid blue;
        // width:95%;
    }
        .hhhh{
            color:black;
            // background:white;
            width:30px;
            height:30px;
        }

    #main-content {
        transition: margin-left 0.5s;
        padding: 16px;
        border:2px solid red;
        // left:0;
        margin-left:0px;
        width:100%;
    }
@media screen and (width <= 600px){
display:block;
// grid-template-columns:90%;
}
`;