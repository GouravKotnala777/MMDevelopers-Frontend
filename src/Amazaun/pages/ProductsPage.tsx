import { FC, ReactElement, useCallback, useState } from "react"
import styled from "styled-components";
import SideBar from "../components/AdminSideBar";
import TableHOC from "../components/TableHOC";
import { Column } from "react-table";
import naruto from "../naruto.jpg";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import HomePage from "../HomePage";


interface DataType{
    photo:ReactElement;
    name:string;
    price:number;
    stock:number;
    action:ReactElement;
};

const columns:Column<DataType>[] = [
    {
        Header:"Photo",
        accessor:"photo"
    },
    {
        Header:"Name",
        accessor:"name"
    },
    {
        Header:"Price",
        accessor:"price"
    },
    {
        Header:"Stock",
        accessor:"stock"
    },
    {
        Header:"Action",
        accessor:"action"
    },
];

const data:DataType[] = [
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product1","price":100,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product2","price":200,"stock":20,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product3","price":300,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product4","price":400,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product5","price":500,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product6","price":600,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product7","price":700,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product8","price":800,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product9","price":900,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product10","price":1000,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product11","price":1100,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product12","price":1200,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product13","price":1300,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product14","price":1400,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product15","price":1500,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product16","price":1600,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product17","price":170,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
    {"photo":<img src={naruto} alt={naruto} style={{width:"8rem"}} />,"name":"Product18","price":1800,"stock":10,"action":<Link to="/admin/product/aaaa" style={{padding:"0.4rem", background:"rgb(87, 205, 255)", borderRadius:"1rem"}}>Manage</Link>},
];


const arr:DataType[] = [];

const ProductsPage:FC = () => {
    // const [data] = useState<DataType[]>(arr);
    const Table = useCallback(TableHOC<DataType>(columns, data, "products_box", "Top Products", true), []);
    
    return(
        <CustomersBackground>
            <SideBar />
            <HomePage />
            <main className="main">
                {Table()}
            </main>
            <Link to="/admin/product/new" className="create-product-button" id="create-product-button"><FaPlus /></Link>
        </CustomersBackground>
    )
}

export default ProductsPage;

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
        overflow:auto;
    }
    .create-product-button{
        position:absolute;
        top:90%;
        right:1rem;
        background:red;
        padding:0.5rem;
        border-radius:1rem;
        color:white;
    }
    .create-product-button:hover{
        background:rgb(255, 118, 118);
        color:black;
    }


@media screen and (width <= 600px){
grid-template-columns:100%;
// z-index:2;
}    
`;