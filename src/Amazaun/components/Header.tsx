import { FC } from "react";
import { AiOutlineTransaction } from "react-icons/ai";
import { BiCart, BiHomeSmile } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { RiDashboardLine, RiShoppingBagLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import styled from "styled-components";


const Header:FC = () => {
    
    return(
        <HeaderBackground>
            <h1>Header</h1>
            <nav className="header_nav">
                <Link to="/"><BiHomeSmile/>Home</Link>
                <Link to="/admin/product"><RiShoppingBagLine/>Products</Link>
                <Link to="/admin/cart"><BiCart/>Cart</Link>
                <Link to="/admin/customer"><IoIosPeople/> Customers</Link>
                <Link to="/admin/transaction"><AiOutlineTransaction/>Transactions</Link>
                <Link to="/admin/dashboard"><RiDashboardLine/> Dashboard</Link>
            </nav>
        </HeaderBackground>
    )
}

export default Header;

const HeaderBackground = styled.section`
// border:2px solid blue;
display:flex;
justify-content:space-between;
background:linear-gradient(90deg, rgb(255, 49, 83), rgb(255, 118, 59));
    .header_nav{
        // border:2px solid black;
        width:40%;
        display:flex;
        justify-content:space-around;
        color:white;
    }
`;