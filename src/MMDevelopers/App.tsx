import { FC, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Home";
import Paymnet from "./Payment";
import Client from "./Client";
import Site from "./Site";
import ClientPlot from "./Client_Plot";
import SellPlot from "./Sell_Plot";
import AddPlot from "./AddPlot";
import AddSite from "./AddSite";
import PaymentStatement from "./PaymentStatement";
import Login from "./Login";
import ClientDashboard from "./Client_Dashboard";
import Agents from "./Agents";
import { onAuthStateChanged } from "firebase/auth";
import { getUser, userApi } from "./redux/api/userAPI";
import { userExist, userNotExist, userReducer } from "./redux/reducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase";
import SettingPage from "./SettingPage";
import Logout from "./Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import styled from "styled-components";
import Skeleton from "./components/Skeleton";
import Loader from "./components/Loader";
import SearchClient from "./SearchClient";

const dummyUser = {
    name:"Gourav",
    email:"gourav@gmail.com",
    pic:"pic",
    gender:"male",
    role:"admin",
    dob:"1-1-24",
    _id:"aaaa"
}

interface AllPlotsBody {
    _id:string;
    site_name:string;
    plot_no:number;
    size:number;
    rate:number;
    client:string;
    payments:string[];
    hasSold:boolean;
};

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


const App:FC = () => {
    const [allPlots, setAllPlots] = useState<AllPlotsBody[]>();
    const dispatch = useDispatch();
    const {user, loading} = useSelector((state:{userReducer:UserReducerInitialState}) => state.userReducer);
    // console.log("::::::::::::::::");
    // console.log(loggedInUser.user);
    // console.log("::::::::::::::::");
    
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("Logged In");
                const data = await getUser(user.uid);
                console.log("------ App.tsx  data");
                console.log(data.message);
                console.log("------ App.tsx  data");
                
                dispatch(userExist(data.message));
            }
            else{
                console.log("------ App.tsx  else");
                dispatch(userNotExist());
            }
        });
        
    }, []);


    return(
        <BrowserRouter>
            <Header user={user} />
                {/* <pre>{JSON.stringify(allPlots, null, `\t`)}</pre> */}
            {
                loading ?
                    <Loader />
                    :
                    <Routes>
                        {/* (node:5716) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE]
                                    DeprecationWarning: 'onAfterSetupMiddleware' option
                                    is deprecated. Please use the 'setupMiddlewares' option.
                        (Use `node --trace-deprecation ...` to show where the warning was created)
                        (node:5716) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE]
                                    DeprecationWarning: 'onBeforeSetupMiddleware' option
                                    is deprecated. Please use the 'setupMiddlewares' option. */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<ProtectedRoute isAuthenticated={user ? false : true}><Login /></ProtectedRoute>} />
                            <Route path="/site/:name" element={<Site />} />
                            <Route path="/payment/:clientID/:plotID" element={<Paymnet />} />
                            <Route path="/statement" element={<PaymentStatement />} />
                            <Route path="/agent" element={<Agents />} />
                            <Route path="/plot/:name" element={<AddPlot />} />
                            <Route path="/add_site/:siteID" element={<AddSite />} />
                            <Route path="/sell/plot/:plotID" element={<SellPlot />} />
                            <Route path="/site_name/:name/plot/:plot_no" element={<ProtectedRoute isAuthenticated={user && user?.role === "admin" ? true : false}><ClientPlot /></ProtectedRoute>} />
                            <Route path="/site_name/:name/plot/:plot_no/dashboard" element={<ClientDashboard />} />
                            {/* <Route path="/site_name/:name/plot/:plot_no" element={<ClientDashboard />} /> */}
                            <Route path="/client" element={<Client />} />
                            <Route path="/setting" element={<SettingPage user={user} />} />
                            <Route path="/logout" element={<ProtectedRoute isAuthenticated={user ? true : false}><Logout /></ProtectedRoute>} />
                            <Route path="/loading" element={<Loader />} />
                            <Route path="/search/client" element={<SearchClient />} />
                    </Routes>
                
            }
        </BrowserRouter>
    )
};

export default App;

const InitialAppBackground = styled.section`
// border:2px solid red;
display:flex;
justify-content:space-around;
flex-wrap:wrap;
padding:20px 10px;
box-sizing:border-box;
background:#f4f4f4;

    
        .site_cont{
            // border:2px solid red;
            width:250px;
            // height:250px;
            border-radius:8px;
            margin:10px;
            text-align:center;
            // text-decoration:none;
            box-shadow:0 8px 16px rgba(0,0,0,0.1);
            // box-shadow: inset 10px 10px 20px 5px rgba(0, 0, 0, 0.5);
            background:#ff763b;
        }
            .site_cont .site_cont_nav{
                // border:2px solid red;
                text-decoration:none;
                background:white;
                display:block;
                border-radius:8px 8px 0 0;
                padding:8px;
            }
                .site_cont .site_cont_nav .main_heading{
                    // border:2px solid pink;
                    // grid-column:1/-1;
                    display:block;
                    font-weight:bold;
                    font-size:18px;
                    margin-bottom:8px;
                }
                .site_cont .site_cont_nav .readings_cont{
                    // border:2px solid green;
                    text-decoration:none;
                    background:white;
                    // display:block;
                    display:grid;
                    grid-template-columns:48% 48%;
                    justify-content:space-around;
                }
                    .site_cont .site_cont_nav .readings_cont .headings{
                        // border:2px solid blue;
                        text-align:left;
                        // font-size:16px;
                        // font-family:Rokkitt;
                    }
                    .site_cont .site_cont_nav .readings_cont .values{
                        // border:2px solid blue;
                        // font-size:14px;
                        // font-family:Rokkitt;
                    }
                    .site_cont .site_cont_nav .readings_cont .agents_cont{
                        // border:2px solid blue;
                        grid-column:1/-1;
                        margin:8px 0;
                        padding:4px;
                        border-radius:4px;
                        box-shadow: inset 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
                    }
                        .site_cont .site_cont_nav .readings_cont .agents_cont .headings{
                            // border:2px solid blue;
                            text-align:left;
                            font-size:14px;
                            font-family:Rokkitt;
                            // font-family:Cutive Mono;
                        }
                        .site_cont .site_cont_nav .readings_cont .agents_cont .values{
                            // border:2px solid blue;
                            font-size:12px;
                            font-family:Rokkitt;
                        }

                        .home_page_main .sites_cont .site_cont .site_cont_nav .readings_cont .agents_cont{
                            // border:2px solid blue;
                            grid-column:1/-1;
                            margin:8px 0;
                            padding:4px;
                            border-radius:4px;
                            box-shadow: inset 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
                        }
                            .home_page_main .sites_cont .site_cont .site_cont_nav .readings_cont .agents_cont .headings{
                                // border:2px solid blue;
                                text-align:left;
                                font-size:14px;
                                font-family:Rokkitt;
                                // font-family:Cutive Mono;
                            }
                            .home_page_main .sites_cont .site_cont .site_cont_nav .readings_cont .agents_cont .values{
                                // border:2px solid blue;
                                font-size:12px;
                                font-family:Rokkitt;
                            }

            .site_cont .remove_and_edit_btn{
                // border:2px solid green;
                display:flex;
                justify-content:space-around;
                padding:4px 0;
                height:35px;
            }


    @media screen and (width <= 300px){
    .site_cont .site_cont_nav .readings_cont .headings{
    // border:2px solid blue;
    text-align:left;
    font-size:13px;
    }
    .site_cont .site_cont_nav .readings_cont .values{
    // border:2px solid blue;
    font-size:11px;
    }
    .site_cont .site_cont_nav .main_heading{
    border:1px solid orange;
    // grid-column:1/-1;
    display:block;
    font-weight:bold;
    font-size:16px;
    padding:4px;
    margin-bottom:8px;
    border-radius:4px;
    }
    .site_cont .remove_and_edit_btn button{
    // border:2px solid green;
    background:white;
    border:none;
    padding:4px 6px;
    border-radius:4px;
    font-size:13px;
    }
    .site_cont .remove_and_edit_btn .edit_nav{
    // border:2px solid green;
    background:white;
    padding:4px;
    border-radius:4px;
    }
    }

`;