import {FC, useEffect, useState} from "react";
import styled from "styled-components";
import Form from "./components/Form";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import { BiGrid, BiGridAlt, BiLeftArrowAlt, BiListOl } from "react-icons/bi";
import { IoIosBookmark } from "react-icons/io";
import { RiAddBoxLine } from "react-icons/ri";
import soldOut from "./sold-out-2.png";
import inStock from "./for-sale.png";
import { AllPlotsState } from "./types/types";
import { useSelector } from "react-redux";
import { userReducer } from "./redux/reducer/userReducer";
import TopButtons from "./components/TopButtons";
import Skeleton from "./components/Skeleton";

const formFields = [
    {label:"site_name", type:"text"},
    {label:"site_no", type:"number"},
    {label:"size", type:"number"},
    {label:"rate", type:"number"},
];

interface User {
    name?:string;
    email?:string;
    pic?:string;
    gender?:string;
    role?:string;
    dob?:string;
    _id?:string;
};

interface UserReducerInitialState {
    user:User|null;
    loading:boolean;
};



const Site = () => {
    
    const {user, loading} = useSelector((state:{userReducer:UserReducerInitialState}) => state[userReducer.name]);
    const {name} = useParams<string>();
    const [plots, setPlots] = useState<AllPlotsState[]>();
    const [viewStyleGrid, setViewStyleGrid] = useState<boolean>(false);
    const navigate = useNavigate();

    

    const getPlotsBySite = async() => {        
        const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/plot/site/${name}`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const data = await res.json();

        console.log("-----------------Query Site.tsx");
        console.log(name);
        console.log(data);
        setPlots(data.message);
        console.log("-----------------");
        
    };

    const removePlot = async(plotID:number) => {
        const plotRemoveConfirmation:boolean = window.confirm("Do you want to delete this Plot. It will be removed Permanently!");

        if (plotRemoveConfirmation) {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/plot/remove`, {
                    method:"DELETE",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({_id:plotID})
                });
        
                const data = await res.json();
        
                console.log("-----------------removePlot Site.tsx");
                console.log(data);
                console.log("-----------------");
                
                if (data.success) {
                    toast.success(data.message);
                    getPlotsBySite();
                }
                else{
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error("Error Occured");
            }
        }
    };

    useEffect(() => {
        getPlotsBySite();
    }, []);
    
    return(
        <SiteBackground>
            <Toaster />
            
            <main className="site_page_main">
                {/* <pre>{JSON.stringify(plots, null, `\t`)}</pre> */}
                <TopButtons firstBtn={BiLeftArrowAlt} firstBtnOnClick={() => navigate(-1)} lastBtn={user && user.role === "admin" ? RiAddBoxLine : undefined} lastBtnOnClick={() => navigate(`/plot/${name}`)} />
                <div className="plot_view_layout_btns">
                    <BiGridAlt onClick={() => setViewStyleGrid(true)} style={{background:viewStyleGrid ? "gray" : "#f4f4f4", borderRadius:"3px", color:viewStyleGrid ? "white" : "black", marginLeft:"auto"}} />
                    <BiListOl onClick={() => setViewStyleGrid(false)} style={{background:viewStyleGrid ? "#f4f4f4" : "gray", borderRadius:"3px", color:viewStyleGrid ? "black" : "white", margin:"0 10px"}} />
                </div>
                <div className="plots_cont">
                    {
                        !plots ?
                            <>
                                <div className="plot_cont_list">
                                    <div className="plot_cont_nav_list" style={{padding:"6px 10px"}}>
                                        <h3><Skeleton height={19} width={100} /></h3>
                                        <p><Skeleton height={19} width={100} /></p>
                                        <p><Skeleton height={19} width={100} /></p>
                                    </div>
                                </div>
                            </>
                            :
                            plots?.map((item, index) => 
                                viewStyleGrid ?
                                    (
                                        <div key={index} className="plot_cont_grid" style={{background:item.hasSold ? ((((item.size*item.rate)/item.duration)*item.timeCovered)-(item.totalPaid) <= 0 ? "#00ffaa" : "#ff9090") : "white"}}>
                                            {/* <NavLink to={`/site_name/${item.site_name}/plot/${item.plot_no}`}>Admin</NavLink> */}
                                            <NavLink to={`/site_name/${item.site_name}/plot/${item.plot_no}/dashboard`} className="plot_cont_nav_grid">
                                                {/* <IoIosBookmark className="book_mark" style={{color:item.hasSold ? "#dd0000" : "#00bb00"}} /> */}
                                                <h3>{item.plot_no}</h3>
                                                <p>{item.size}</p>
                                                <img className="sold_out_img" src={item.hasSold ? soldOut : inStock} alt={item.hasSold ? soldOut : inStock} />
                                                {/* <p style={{color:(((item.size * item.rate) / item?.duration) * item?.timeCovered) - item.totalPaid < 0 ? "#00bb00" : "#dd0000", fontWeight:"bold"}}>{(((item.size * item.rate) / item?.duration) * item?.timeCovered) - item.totalPaid < 0 ? "Advance : " : "Pending : "}{(((item.size * item.rate) / item?.duration) * item?.timeCovered) - item.totalPaid < 0 ? "+" : "-"}{Math.abs(((((item.size * item.rate) / item?.duration) * item?.timeCovered) - item.totalPaid))}</p> */}
                                            </NavLink>
                                            {/* <button onClick={() => {removePlot(item._id!)}}>Remove</button> */}
                                        </div>
                                    )
                                :
                                    (
                                        <div key={index} className="plot_cont_list">
                                            {
                                                user && user.role === "admin" ?
                                                    <NavLink to={`/site_name/${item.site_name}/plot/${item.plot_no}`}>Admin</NavLink>
                                                    :
                                                    ""
                                            }
                                            <NavLink to={`/site_name/${item.site_name}/plot/${item.plot_no}/dashboard`} className="plot_cont_nav_list">
                                                <IoIosBookmark className="book_mark" style={{color:item.hasSold ? "#dd0000" : "#00bb00"}} />
                                                <h3>{item.plot_no}</h3>
                                                <p>{item.size}</p>
                                                {
                                                    item.client ?
                                                        <p style={{color:(((item.size * item.rate) / item?.duration) * item?.timeCovered) - item.totalPaid < 0 ? "#00bb00" : "#dd0000", fontWeight:"bold"}}>{(((item.size * item.rate) / item?.duration) * item?.timeCovered) - item.totalPaid < 0 ? "Advance : " : "Pending : "}{(((item.size * item.rate) / item?.duration) * item?.timeCovered) - item.totalPaid < 0 ? "+" : "-"}{Math.abs(((((item.size * item.rate) / item?.duration) * item?.timeCovered) - item.totalPaid))}</p>
                                                        :
                                                        <p style={{fontWeight:"bold", color:"#00bb00"}}>Vacant</p>
                                                }
                                            </NavLink>
                                        </div>
                                    )
                            )
                    }
                </div>
                
            </main>
        </SiteBackground>
    )
}

export default Site;

const SiteBackground = styled.section`
// border:2px solid red;
box-sizing:border-box;
// display:grid;
// grid-template-columns:20% 80%;
height:100vh;
// background:#f4f4f4;
background:linear-gradient(90deg, #ffe1e6, #ffffff);

    .site_page_main{
        // background:white;
    }
    .plot_view_layout_btns{
        // border:2px solid red;
        display:flex;
        // justify-content:space-between;
        padding:10px;
    }
        .site_page_main .plots_cont{
            // border:2px solid blue;
            display:flex;
            justify-content:space-around;
            flex-wrap:wrap;
            padding:8px;
        }
            .site_page_main .plots_cont .plot_cont_grid{
                // border:2px solid red;
                width:60px;
                height:60px;
                border-radius:8px;
                margin:8px;
                text-align:center;
                box-shadow:0 8px 16px rgba(0,0,0,0.1);
            }
                .site_page_main .plots_cont .plot_cont_grid .plot_cont_nav_grid{
                    // border:2px solid blue;
                    text-decoration:none;
                    color:black;
                    position:relative;
                    display:block;
                }
                .site_page_main .plots_cont .plot_cont_grid .plot_cont_nav_grid h3{
                    font-size:11px;
                }
                .site_page_main .plots_cont .plot_cont_grid .plot_cont_nav_grid p{
                    font-size:11px;
                }
                .site_page_main .plots_cont .plot_cont_grid .plot_cont_nav_grid .sold_out_img{
                    // border:2px solid red;
                    width:40%;
                    position:absolute;
                    top:-10px;
                    right:0;
                }

            .site_page_main .plots_cont .plot_cont_list{
                // border:2px solid red;
                width:150px;
                height:150px;
                border-radius:8px;
                margin:8px;
                text-align:center;
                box-shadow:0 8px 16px rgba(0,0,0,0.1);
                background:white;
            }
                .site_page_main .plots_cont .plot_cont_list .plot_cont_nav_list{
                    // border:2px solid blue;
                    text-decoration:none;
                    color:black;
                    position:relative;
                    display:block;
                }
                .site_page_main .plots_cont .plot_cont_list .plot_cont_nav_list .book_mark{
                    // border:2px solid blue;
                    font-size:46px;
                    position:absolute;
                    top:-21px;
                    right:0;
                    // height:30px;
                    
                }
                .site_page_main .plots_cont .plot_cont_list .plot_cont_nav_list h3{
                    font-size:16px;
                }
                .site_page_main .plots_cont .plot_cont_list .plot_cont_nav_list p{
                    font-size:16px;
                }






    img{
        width:200px;
    }


@media screen and (width <= 400px){
    .site_page_main .plots_cont .plot_cont .plot_cont_nav h3{
        font-size:14px;
    }
    .site_page_main .plots_cont .plot_cont .plot_cont_nav p{
        font-size:14px;
    }
}
`;