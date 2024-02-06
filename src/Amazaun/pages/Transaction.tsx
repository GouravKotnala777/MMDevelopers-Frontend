import { FC, ReactElement, useCallback, useState } from "react";
import SideBar from "../components/AdminSideBar";
import styled from "styled-components";
import naruto from "../naruto.jpg";
import { Link } from "react-router-dom";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import HomePage from "../HomePage";


interface DataType {
    user:string;
    amount:number;
    discount:number;
    quantity:number;
    status:string;
    action:ReactElement;
}

const columns:Column[] = [
    {Header:"User", accessor:"user"},
    {Header:"Amount", accessor:"amount"},
    {Header:"Discount", accessor:"discount"},
    {Header:"Quantity", accessor:"quantity"},
    {Header:"Status", accessor:"status"},
    {Header:"Action", accessor:"action"}
];

const tableData:DataType[] = [
    {user:"Gouarv", amount:100, discount:50, quantity:1, status:"Shipped", action:<Link to="/admin/transaction/:id" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {user:"Naruto", amount:200, discount:0, quantity:1, status:"Processing", action:<Link to="/admin/transaction/:id" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {user:"Sasuke", amount:300, discount:0, quantity:1, status:"Delivered", action:<Link to="/admin/transaction/:id" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
];

const Transaction:FC = () => {
    const [data] = useState<DataType[]>(tableData);

    const Table = useCallback(TableHOC(columns, data, "Transaction_box", "Transactions", true), []);
    
    return(
        <TransactionBackground>
            <SideBar />
            <HomePage />
            <main className="main">
                {Table()}
            </main>
        </TransactionBackground>
    )
}

export default Transaction;

const TransactionBackground = styled.section`
border:2px solid red;
display:grid;
grid-template-columns:20% 80%;
height:100vh;
    .aa{
        border:2px solid blue;
        height:100%;
    }
    .main{
        border:2px solid green;
    }

@media screen and (width <= 600px){
grid-template-columns:100%;
// z-index:2;
}
`;