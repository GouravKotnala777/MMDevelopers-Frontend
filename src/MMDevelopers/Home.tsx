import {FC, MouseEventHandler, useEffect, useState} from "react";
import styled from "styled-components";
import Form, { LabelInput } from "./components/Form";
import { NavLink, useNavigate } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import { BiAddToQueue, BiDownArrow, BiEdit, BiSolidDownArrow, BiSolidUpArrow, BiSolidUpArrowAlt, BiSolidUpArrowCircle, BiSolidUpArrowSquare, BiUpArrow, BiUpArrowAlt, BiUpArrowCircle } from "react-icons/bi";
import { AllSitesState } from "./types/types";
import { fetchPlotData } from "./redux/api/plotAPI";
import { useDispatch, useSelector } from "react-redux";
import { plotExist } from "./redux/reducer/plotSlice";
import { User } from "firebase/auth";
import { userReducer } from "./redux/reducer/userReducer";
import TopButtons from "./components/TopButtons";
import { IoMdPeople } from "react-icons/io";
import Skeleton from "./components/Skeleton";

const sites = ["Jajru(Ist)", "Jajru(IInd)", "Jajru(IVth)", "Jajru(Vth)", "Jajru(VIth)", "Sec-58"];

const formFields = [
    {label:"Name", type:"text"},
    {label:"Email", type:"text"},
    {label:"Gender", type:"text"},
    {label:"Age", type:"text"},
    {label:"Role", type:"text"},
];
interface TransformedDataType {
    [key: string]: {
        [key2:string]:number;
    };
}
interface TransformedDataTypeFInner {
    [agentName:string]:{
        allPlotsPendings:number;
        totalSoldArea:number;
        allPlotsBalance:number;
    };
};
interface TransformedDataTypeF {
    [key: string]: TransformedDataTypeFInner;
};




interface OldPlot {
    plot_no: number;
    size: number;
    rate: number;
    duration: number;
    downPayment: number;
    hasSold: boolean;
    agent: string;
    pendings: number;
    paid: number;
  }
  
  interface OldSite {
    site_name: string;
    plots: OldPlot[];
  }
  
  type OldDataType = OldSite[];
  
  interface TransformedAgentData {
    pendings: number;
    soldPlots: number;
  }
  
  interface TransformedSiteData {
    [agent: string]: TransformedAgentData;
  }
  
  interface TransformedDataTypeNew {
    [site: string]: TransformedSiteData;
  }
  interface Ddata {
    user:User; loading:boolean;
  }



interface UserType {
    name?:string;
    email?:string;
    pic?:string;
    gender?:string;
    role?:string;
    dob?:string;
    _id?:string;
};

interface UserReducerInitialState {
    user:UserType|null;
    loading:boolean;
};


const Home = () => {
    const {user, loading} = useSelector((state:{userReducer:UserReducerInitialState}) => state[userReducer.name]);
    const [allSites, setAllSites] = useState<AllSitesState[]>();
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    let c:TransformedDataType = {};
    let agentNameArrayUnique:string[] = [];
    let transformedData: TransformedDataTypeNew = {};

    const fetchAllSites = async() => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/site/all`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const data = await res.json();

        console.log("------- fetchAllSites Home.tsx");
        console.log(data);
        console.log(user);
        setAllSites(data.message);
        console.log("------- fetchAllSites Home.tsx");
    };
    const deleteSite = async(siteID:string) => {
        console.log(siteID);
        const siteRemoveConfirmation = window.confirm("Do you want to delete this site. It will be removed Permanently!");
        
        if (siteRemoveConfirmation) {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/site/${siteID}`, {
                    method:"DELETE",
                    headers:{
                        "Content-Type":"application/json"
                    }
                });
        
                const data = await res.json();
        
                console.log("------- deleteSite Home.tsx");
                console.log(data);
                console.log("------- deleteSite Home.tsx");
    
                if (data.success) {
                    toast.success(data.message);
                    fetchAllSites();
                }
                else{
                    toast.error(data.message);
                }
            } catch (error) {
                toast.error("Error Occured");
            }
        }

        
    };


    const calcu = () => {
        allSites?.forEach((i, inde) => {
            let obj:{[key2:string]:number;} = {}
            i.plots.forEach((j) => {
                if (j.agent) {
                    if(j.totalShouldPay - j.totalPaid > 0){
                        obj.allPlotsPendings = obj.allPlotsPendings ? (obj.allPlotsPendings - Math.abs(j.totalShouldPay - j.totalPaid)) : 0 - (Math.abs(j.totalShouldPay - j.totalPaid));
                    }
                    obj.allPlotsBalance = obj.allPlotsBalance ? (obj.allPlotsBalance + ((j.size * j.rate) - j.totalPaid)) : ((j.size * j.rate) - j.totalPaid);
                    obj.totalSoldArea = obj.totalSoldArea ? (obj.totalSoldArea + j.size) : (j.size);
    
                    obj[j.agent] = obj[j.agent] ? (obj[j.agent] + j.size) : (j.size);
                }
            })
            c[i.site_name] = obj;
            
        })
        // console.log("FFFFFFFFFFFFF");
        // console.log(c);
        // console.log("FFFFFFFFFFFFF");
    };


    const calcuNew = () => {
        allSites?.forEach((site) => {
            transformedData[site.site_name] = {};
          
            site.plots.forEach((plot) => {                
                if (plot.agent) {
                    if (!transformedData[site.site_name][plot.agent]) {
                        transformedData[site.site_name][plot.agent] = {
                            pendings: 0,
                            soldPlots: 0,
                        };
                    }
                    
                    if ((plot.totalShouldPay - plot.totalPaid) >= 0) {
                        transformedData[site.site_name][plot.agent].pendings = transformedData[site.site_name][plot.agent].pendings - (plot.totalShouldPay - plot.totalPaid);
                    }
                    transformedData[site.site_name][plot.agent].soldPlots += plot.hasSold ? plot.size : 0;
                }
            });
          });
          
        // console.log("@@@@@@@@@@@@@@@@@");
        // console.log(transformedData);
        // console.log("@@@@@@@@@@@@@@@@@");


        const siteNamekeysArray = Object.keys(transformedData);
    
        let agentNameArrayWithDuplicates = siteNamekeysArray.map((i) => {
            return [...Object.keys(transformedData[i])]
        });

        agentNameArrayUnique = Array.from(new Set(agentNameArrayWithDuplicates.flat()));
        // console.log(agentNameArrayUnique);


        
    }


    calcu();
    calcuNew();

    useEffect(() => {
        fetchAllSites();
    }, []);

    return(
        <HomeBackground>
            <Toaster />

            <main className="home_page_main">
                <TopButtons otherBtns={[IoMdPeople]} otherBtnsOnClick={[() => navigate("/agent", {state:transformedData})]} lastBtn={user && user.role === "admin" ? BiAddToQueue : undefined} lastBtnOnClick={() => {navigate("/add_site/new")}} />
                {/* <pre>{JSON.stringify(allSites, null, `\t`)}</pre> */}
                <div className="sites_cont">
                    {
                        allSites ?
                            allSites.map((item, index) =>
                                <div className="site_cont" key={index}>
                                    <NavLink className="site_cont_nav" to={`/site/${item.site_name}`}>
                                        <span className="main_heading">{item.site_name}</span>
                                        <div className="readings_cont">
            
                                            <span className="headings">Total Area</span><span className="values">{item.total_size} (yard)<sup>2</sup></span>
                                            <span className="headings">Sold Area</span><span className="values">{c[item.site_name].totalSoldArea ? c[item.site_name].totalSoldArea : 0} (yard)<sup>2</sup></span>
                                            <span className="headings">Total Balance</span><span className="values">{c[item.site_name].allPlotsBalance ? c[item.site_name].allPlotsBalance : 0} ₹</span>
                                            <span className="headings">Total Pendings</span><span className="values">{c[item.site_name].allPlotsPendings ? c[item.site_name].allPlotsPendings : 0} ₹</span>
                                            
                                            <div className="agents_cont">
                                                {/* <span className="checkout_agents"><BiEdit/></span> */}
                                                {
                                                    agentNameArrayUnique.map((agentName, iindex) => c[item.site_name][agentName]&&(
                                                        <>
                                                            <span className="headings">{agentName}</span><span className="values">{c[item.site_name][agentName]} (yard)<sup>2</sup></span>
                                                        </>
                                                    ))
                                                }
                                            </div>
                                        </div>
            
                                    </NavLink>
                                    <div className="remove_and_edit_btn">
                                        {
                                            user && user.role === "admin" ?
                                            <>
                                                <button onClick={() => deleteSite(item._id)}>Remove</button>
                                                <NavLink to={`/add_site/${item._id}`} className="edit_nav"><BiEdit style={{color:"black"}}/></NavLink>
                                            </>
                                            :
                                            ""
                                        }
                                    </div>
                                </div>
                            )
                            :
                            <div className="site_cont">
                                <div className="site_cont_nav">
                                    <span className="main_heading"><Skeleton height={19} width={100} /></span>
                                    <div className="readings_cont">

                                        <span className="headings">Total Area</span><Skeleton height={15} width={100} />
                                        <span className="headings">Sold Area</span><Skeleton height={15} width={100} />
                                        <span className="headings">Total Balance</span><Skeleton height={15} width={100} />
                                        <span className="headings">Total Pendings</span><Skeleton height={15} width={100} />
                                        
                                        <div className="agents_cont">
                                            <Skeleton height={15} width={100} />
                                            <Skeleton height={15} width={100} />
                                        </div>
                                    </div>
                                </div>
                                <div className="remove_and_edit_btn">
                                </div>
                            </div>
                    }
                </div>


            </main>
        </HomeBackground>
    )
}

export default Home;

const HomeBackground = styled.section`
// border:2px solid red;
box-sizing:border-box;

    .home_page_main{
        // background:#f4f4f4;
        // background: #ffe6ee;
        // background:linear-gradient(90deg, #ffe7dd, #ffe1e6);
        background:linear-gradient(90deg, #ffe1e6, #ffffff);
    }
        .home_page_main .sites_cont{
            // border:2px solid blue;
            display:flex;
            justify-content:space-around;
            flex-wrap:wrap;
            padding:10px;
        }
            .home_page_main .sites_cont .site_cont{
                // border:2px solid red;
                width:250px;
                // height:250px;
                border-radius:8px;
                margin:10px;
                text-align:center;
                // text-decoration:none;
                box-shadow:0 8px 16px rgba(0,0,0,0.1);
                // box-shadow: inset 10px 10px 20px 5px rgba(0, 0, 0, 0.5);
                // background:#ff763b;
                background:linear-gradient(90deg, rgb(255, 49, 83), rgb(255, 118, 59));
            }
                .home_page_main .sites_cont .site_cont .site_cont_nav{
                    // border:2px solid red;
                    text-decoration:none;
                    color:black;
                    background:white;
                    display:block;
                    border-radius:8px 8px 0 0;
                    padding:8px;
                }
                    .home_page_main .sites_cont .site_cont .site_cont_nav .main_heading{
                        border:1px solid orange;
                        // grid-column:1/-1;
                        display:block;
                        font-weight:bold;
                        font-size:18px;
                        padding:4px;
                        margin-bottom:8px;
                        border-radius:4px;
                    }
                    .home_page_main .sites_cont .site_cont .site_cont_nav .readings_cont{
                        // border:2px solid green;
                        text-decoration:none;
                        background:white;
                        // display:block;
                        display:grid;
                        grid-template-columns:48% 48%;
                        justify-content:space-around;
                    }
                        .home_page_main .sites_cont .site_cont .site_cont_nav .readings_cont .headings{
                            // border:2px solid blue;
                            text-align:left;
                            font-size:16px;
                        }
                        .home_page_main .sites_cont .site_cont .site_cont_nav .readings_cont .values{
                            // border:2px solid blue;
                            font-size:14px;
                        }
                        .home_page_main .sites_cont .site_cont .site_cont_nav .readings_cont .agents_cont{
                            // border:2px solid blue;
                            grid-column:1/-1;
                            display:grid;
                            grid-template-columns:48% 48%;
                            margin:8px 0;
                            padding:4px;
                            border-radius:4px;
                            box-shadow: inset 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
                            justify-content:space-around;
                        }
                            .home_page_main .sites_cont .site_cont .site_cont_nav .readings_cont .agents_cont .headings{
                                // border:2px solid green;
                                // text-align:left;
                                font-size:14px;
                                font-family:Rokkitt;
                            }
                            .home_page_main .sites_cont .site_cont .site_cont_nav .readings_cont .agents_cont .values{
                                // border:2px solid yellow;
                                font-size:12px;
                                font-family:Rokkitt;
                            }

                .home_page_main .sites_cont .site_cont .remove_and_edit_btn{
                    // border:2px solid green;
                    display:flex;
                    justify-content:space-around;
                    padding:4px 0;
                    height:35px;
                }
                    .home_page_main .sites_cont .site_cont .remove_and_edit_btn button{
                        // border:2px solid green;
                        background:white;
                        border:none;
                        padding:6px 8px;
                        border-radius:4px;
                    }
                    .home_page_main .sites_cont .site_cont .remove_and_edit_btn .edit_nav{
                        // border:2px solid green;
                        background:white;
                        padding:6px;
                        border-radius:4px;
                    }

    img{
        width:200px;
    }


@media screen and (width <= 300px){
    .home_page_main .sites_cont .site_cont .site_cont_nav .readings_cont{
        // border:2px solid blue;
        font-size:13px;
    }
    .home_page_main .sites_cont .site_cont .site_cont_nav .readings_cont .headings{
        // border:2px solid blue;
        text-align:left;
        font-size:13px;
        // color:gray;
    }
    .home_page_main .sites_cont .site_cont .site_cont_nav .readings_cont .values{
        // border:2px solid blue;
        font-size:11px;
        color:gray;
    }
    .home_page_main .sites_cont .site_cont .site_cont_nav .main_heading{
        border:1px solid orange;
        // grid-column:1/-1;
        font-size:16px;
    }
    .home_page_main .sites_cont .site_cont .remove_and_edit_btn button{
        // border:2px solid green;
        background:white;
        border:none;
        padding:4px 6px;
        border-radius:4px;
        font-size:13px;
    }
    .home_page_main .sites_cont .site_cont .remove_and_edit_btn .edit_nav{
        // border:2px solid green;
        background:white;
        padding:4px;
        border-radius:4px;
    }
}
`;









// let oldData = [
// 	{
// 		site_name: "Site1",
// 		total_size: 126,
//         soldPlots:84,
// 		plots: [
// 			{
// 				plot_no: 1,
// 				size: 50,
// 				rate: 10000,
// 				duration: 42,
// 				downPayment: 0,
// 				hasSold: true,
// 				agent: "mishraji",
            //  pendings:9000,
            //  paid:1000
// 			},
// 			{
// 				plot_no: 2,
// 				size: 60,
// 				rate: 10000,
// 				duration: 42,
// 				downPayment: 0,
// 				hasSold: true,
// 				agent: "sainiji",
            //  pendings:8000,
            //  paid:2000
// 			},
// 			{
// 				plot_no: 3,
// 				size: 40,
// 				rate: 10000,
// 				duration: 42,
// 				downPayment: 0,
// 				hasSold: true,
// 				agent: "mishraji",
            //  pendings:4000,
            //  paid:6000
// 			},
			
// 		]
// 	},
// 	{
// 		site_name: "Site2",
// 		total_size: 106,
//         soldPlots:42,
// 		plots: [
// 			{
// 				plot_no: 1,
// 				size: 30,
// 				rate: 10000,
// 				duration: 42,
// 				downPayment: 0,
// 				hasSold: true,
// 				agent: "mishraji",
            //  pendings:5000,
            //  paid:5000
// 			}
// 		],
// 	}
// ];

// let transformedData = {
//     "Site1":{
//         "sainiji":{
//             pendings:8000,
//             soldPlots:60,
//         },
//         "mishraji":{
//             totalPendings:13000,
//             soldPlots:90,
//         }
//     },
//     "Site2":{
//         "mishraji":{
//             pendings:5000,
//             soldPlots:30,
//         }
//     }
// }

// let transformedData = {
//     "Site1":{
//         total_size:126,
//         soldPlots:84,
//         agents:[
//                 {agentName:"sainiji", sellings:42},
//                 {agentName:"mishraji", sellings:42}
//         ]
//     },
//     "Site2":{
//         total_size:106,
//         soldPlots:42,
//         agents:[
//             {agentName:"mishraji", sellings:42}
//         ]
//     }
// }