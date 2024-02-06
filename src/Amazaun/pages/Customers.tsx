import { FC, ReactElement, useCallback, useState } from "react";
import SideBar from "../components/AdminSideBar";
import styled from "styled-components";
import { Column } from "react-table";
import TableHOC from "../components/TableHOC";
import { Link } from "react-router-dom";
import naruto from "../naruto.jpg";
import { FaTrash } from "react-icons/fa";
import HomePage from "../HomePage";


interface DataType {
    avatar:ReactElement;
    name:string;
    gender:string;
    email:string;
    role:string;
    action:ReactElement;
};

const columns:Column<DataType>[] = [
    {Header:"Avatar", accessor:"avatar"},
    {Header:"Name", accessor:"name"},
    {Header:"Gender", accessor:"gender"},
    {Header:"Email", accessor:"email"},
    {Header:"Role", accessor:"role"},
    {Header:"Action", accessor:"action"},
];

const tableData:DataType[] = [
    {avatar:<img src={naruto} alt={naruto} />, name:"Gourav", gender:"male", email:"gourav@gmail.com", role:"user", action:<Link to="/admin/dashboard/aaaaaa"><FaTrash /></Link>},
    {avatar:<img src={naruto} alt={naruto} />, name:"Naruto", gender:"male", email:"naruto@gmail.com", role:"user", action:<Link to="/admin/dashboard/aaaaaa"><FaTrash /></Link>},
    // {avatar:<img src={naruto} alt={naruto} />, name:"Sasuke", gender:"male", email:"sasuke@gmail.com", role:"user", action:<Link to="/admin/dashboard/aaaaaa">Manage</Link>},
    // {avatar:<img src={naruto} alt={naruto} />, name:"Kakashi", gender:"male", email:"kakashi@gmail.com", role:"admin", action:<Link to="/admin/dashboard/aaaaaa">Manage</Link>},
    // {avatar:<img src={naruto} alt={naruto} />, name:"Tanjiro", gender:"male", email:"tanjiro@gmail.com", role:"user", action:<Link to="/admin/dashboard/aaaaaa">Manage</Link>},
    // {avatar:<img src={naruto} alt={naruto} />, name:"Itachi", gender:"male", email:"itachi@gmail.com", role:"admin", action:<Link to="/admin/dashboard/aaaaaa">Manage</Link>},
    // {avatar:<img src={naruto} alt={naruto} />, name:"Itachi", gender:"male", email:"itachi@gmail.com", role:"admin", action:<Link to="/admin/dashboard/aaaaaa">Manage</Link>},
    // {avatar:<img src={naruto} alt={naruto} />, name:"Itachi", gender:"male", email:"itachi@gmail.com", role:"admin", action:<Link to="/admin/dashboard/aaaaaa">Manage</Link>},
    // {avatar:<img src={naruto} alt={naruto} />, name:"Itachi", gender:"male", email:"itachi@gmail.com", role:"admin", action:<Link to="/admin/dashboard/aaaaaa">Manage</Link>},
    // {avatar:<img src={naruto} alt={naruto} />, name:"Itachi", gender:"male", email:"itachi@gmail.com", role:"admin", action:<Link to="/admin/dashboard/aaaaaa">Manage</Link>},
    // {avatar:<img src={naruto} alt={naruto} />, name:"Itachi", gender:"male", email:"itachi@gmail.com", role:"admin", action:<Link to="/admin/dashboard/aaaaaa">Manage</Link>},
    // {avatar:<img src={naruto} alt={naruto} />, name:"Itachi", gender:"male", email:"itachi@gmail.com", role:"admin", action:<Link to="/admin/dashboard/aaaaaa">Manage</Link>},
    // {avatar:<img src={naruto} alt={naruto} />, name:"Itachi", gender:"male", email:"itachi@gmail.com", role:"admin", action:<Link to="/admin/dashboard/aaaaaa">Manage</Link>},
    // {avatar:<img src={naruto} alt={naruto} />, name:"Itachi", gender:"male", email:"itachi@gmail.com", role:"admin", action:<Link to="/admin/dashboard/aaaaaa">Manage</Link>},
];


const Customers:FC = () => {
    const [data] = useState<DataType[]>(tableData);
    
    const Table = useCallback(TableHOC<DataType>(columns, data, "customer_box", "Customers", true), [])
    
    return(
        <CustomersBackground>
            <SideBar />
            <HomePage />
            <main className="main">
                {Table()}
            </main>
        </CustomersBackground>
    )
    // const Table = useCallback(TableHOC<DataType>(columns, data, "customer_box", "Customers", true), [])
    
    // return(
    //     <CustomersBackground>
    //         <SideBar />
    //         <main className="main">
    //             {Table()}
    //         </main>
    //     </CustomersBackground>
    // )
}

export default Customers;

const CustomersBackground = styled.section`
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
        // overflow:auto;

        // border:2px solid green;
    }


@media screen and (width <= 600px){
grid-template-columns:100%;
// z-index:2;
}    
`;