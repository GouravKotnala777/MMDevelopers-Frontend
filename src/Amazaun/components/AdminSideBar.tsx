import { FC } from "react";
import styled from "styled-components";
import { Link, Location, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import { RiDashboardFill, RiShoppingBagFill } from "react-icons/ri";
import { AiFillFileText } from "react-icons/ai";
import { IoIosPeople } from "react-icons/io";
import { FaChartBar, FaChartPie, FaChartLine } from "react-icons/fa";

const SideBar:FC = () => {
    const location = useLocation();
    
    return(
        <AdminSideBarBackground>
            <aside className="admin_sidebar_aside">
                <h2 className="admin_sidebar_heading">Logo.</h2>
                <div>
                    <h3 className="admin_sidebar_sub_heading">DASHBOARD</h3>
                    <ul>
                        <Li url="/admin/dashboard" location={location} Icon={RiDashboardFill} text="Dashboard" />
                        
                        <Li url="/admin/product" location={location} Icon={RiShoppingBagFill} text="Products" />
                        
                        <Li url="/admin/customer" location={location} Icon={IoIosPeople} text="Customers" />

                        <Li url="/admin/transaction" location={location} Icon={AiFillFileText} text="Transactions" />
                    </ul>
                    <h3 className="admin_sidebar_sub_heading">Charts</h3>
                    <ul>
                        <Li url="/admin/chart/bar" location={location} Icon={FaChartBar} text="Bar" />
                        
                        <Li url="/admin/chart/pie" location={location} Icon={FaChartPie} text="Pie" />
                        
                        <Li url="/admin/chart/line" location={location} Icon={FaChartLine} text="Line" />
                    </ul>
                    <h3 className="admin_sidebar_sub_heading">Apps</h3>
                    <ul>
                        <Li url="/admin/app/coupan" location={location} Icon={FaChartBar} text="Coupan" />
                        
                        <Li url="/admin/app/stopwatch" location={location} Icon={FaChartPie} text="Stop Watch" />
                        
                        <Li url="/admin/app/toss" location={location} Icon={FaChartLine} text="Toss" />
                    </ul>
                </div>
            </aside>
        </AdminSideBarBackground>
    )
}

export const Li = ({url, location, Icon, text}:{url:string; location:Location; Icon:IconType; text:string;})=>
                <li className="admin_sidebar_li" style={{background:location.pathname.includes(url) ? "linear-gradient(to right , rgba(68, 152, 255, 0.216), rgba(184, 255, 240, 0.1))" : "white"}}>
                    <Link className="admin_sidebar_link" to={url} style={{color:location.pathname.includes(url) ? "rgba(68, 152, 255)" : "black"}}>
                        <Icon style={{marginRight:"0.3rem"}} />
                        {text}
                    </Link>
                </li>;


const AdminSideBarBackground = styled.section`
    .admin_sidebar_heading{
        padding:0.3rem;
        margin:0.2rem;
    }
    .admin_sidebar_sub_heading{
        padding:0.4rem 0 0 0.4rem;        
        margin:0.2rem 0 0 0.2rem;
        color:gray;
        font-size:1rem;
    }
    .admin_sidebar_li{
        border-radius:1rem;
        margin:0.1rem;
        font-size:0.9rem;
    }
    .admin_sidebar_link{
        display:flex;
        align-items:center;
        padding:0.4rem;
    }

@media screen and (width <= 600px){
    display:none;
}
`;

export default SideBar;