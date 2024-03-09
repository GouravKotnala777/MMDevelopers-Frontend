import {ChangeEvent, FC, useEffect, useState} from "react";
import styled from "styled-components";
import Form from "./components/Form";
import { Link, useParams, useNavigate, NavLink } from "react-router-dom";
import { constants } from "buffer";
import SellPlot from "./Sell_Plot";
import toast, {Toaster} from "react-hot-toast";
import { RiCloseLine, RiDeleteBin2Line, RiUserAddFill, RiUserAddLine } from "react-icons/ri";
import { BiAddToQueue, BiLeftArrow, BiLeftArrowAlt } from "react-icons/bi";
import { AiOutlineLeftSquare } from "react-icons/ai";
import { PlotDashboard } from "./types/types";
import TopButtons from "./components/TopButtons";


const ClientPlot = () => {    
    const {name, plot_no} = useParams();
    const [plotData, setPlotData] = useState<PlotDashboard>({
        _id:0,
        site_name:"no site_name",
        plot_no:0,
        size:0,
        rate:0,
        client:{
            _id:0,
            code:0,
            name:"no data",
            careTaker:"no data",
            role:"client",
            mobile:0,
            address:""
        },
        payments:[{
            _id:"no data",
            slipNo:"no data",
            amount:0,
            modeOfPayment:"no data",
            transactionID:0,
            chequeNumber:0,
            receiverAccount:0,
            createdAt:"0",
            updateAt:"0"
        }],
        duration:0,
        totalPaid:0,
        timeCovered:0,
        agent:"",
        hasSold:false
    });
    const [paymentStatus, setPaymentStatus] = useState<string>("emi");
    const [serialNo, setSerialNo] = useState<number|"">("");    
    const [clientName, setClientName] = useState<string|"">("");    
    const [clientCareTaker, setClientCareTaker] = useState<string|"">("");
    const navigate = useNavigate();

    const fetchClientPlot = async() => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/plot/site_name/${name}/plot/${plot_no}`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
    
            console.log("----------- ClientPlot.tsx");
            const data = await res.json();
            setPlotData(data.message);
            console.log(data);
            console.log("----------- ClientPlot.tsx");
            
            setSerialNo(data.message?.client?.code ? parseFloat(data.message?.client?.code) : "");
            setClientName(data.message?.client?.name ? data.message?.client?.name : "");
            setClientCareTaker(data.message?.client?.careTaker as string);
            
        } catch (error) {
            console.log(error);
        }
    };

    const updateClientPlot = async() => {
        const clientRemoveConfirmation:boolean = window.confirm("Do you want to update this Client Detailes");

        if (clientRemoveConfirmation) {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/client/client/update`, {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({_id:plotData?.client?._id, code:serialNo, name:clientName, careTaker:clientCareTaker})
                });

                const data = await res.json();

                console.log("--------- update client Client_Plot");
                setPlotData(data.message);
                console.log(data);
                console.log("--------- update client Client_Plot");

                if (data.success) {
                    // setSerialNo("");
                    // setClientName("");
                    // setClientCareTaker("");
                    fetchClientPlot();
                    toast.success(data.message, {
                        position:"bottom-center",
                        duration:1000
                    });
                }
                else{
                    toast.error(data.message, {
                        position:"bottom-center",
                        duration:1000
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Error Occured", {
                    position:"bottom-center",
                    duration:1000
                });
            }
        }
    };

    const deleteClientPlot = async() => {
        const clientRemoveConfirmation:boolean = window.confirm("Do you want to delete this Client. It will be removed Permanently!");
        
        if (clientRemoveConfirmation) {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/client/client/update`, {
                    method:"DELETE",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({clientID:plotData?.client?._id, plotID:plotData?._id})
                });
        
                const data = await res.json();
    
                console.log(data);
                
                if (data.success) {
                    setSerialNo("");
                    setClientName("");
                    setClientCareTaker("");
                    fetchClientPlot();
                    toast.success(data.message, {
                        position:"bottom-center",
                        duration:1000
                    });
                }
                else{
                    toast.error(data.message, {
                        position:"bottom-center",
                        duration:1000
                    });
                }
            } catch (error) {
                console.log(error);
                toast.error("Error Occured", {
                    position:"bottom-center",
                    duration:1000
                });
            }
        }
    };

    const updatePaymentStatus = async(ev:string, paymentID:string) => {
        try {
            // if (paymentStatus) {
                
            // }
            setPaymentStatus(ev);
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/payment/plot/${plotData?._id}/payment/${paymentID}`, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({paymentStatus:ev})
            });

            const data = await res.json();

            console.log("------- updatePaymentStatus Client_Plot.tsx");
            console.log(data);
            console.log("------- updatePaymentStatus Client_Plot.tsx");

            if (data.success) {
                toast.success(data.message, {
                    duration:1000,
                    position:"bottom-center"
                });
                fetchClientPlot();
            }
            else{
                toast.error(data.message, {
                    duration:1000,
                    position:"bottom-center"
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Error Occured", {
                duration:1000,
                position:"bottom-center"
            })            
        }
    };

    const removePayment = async(paymentID:string) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/payment/plot/${plotData?._id}/payment/${paymentID}`, {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            });

            const data = await res.json();

            console.log(data);

            if (data.success) {
                toast.success(data.message, {
                    duration:1000,
                    position:"bottom-center"
                });
                fetchClientPlot();
            }
            else{
                toast.error(data.message, {
                    duration:1000,
                    position:"bottom-center"
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Error Occured", {
                duration:1000,
                position:"bottom-center"
            })            
        }
    };
    
    useEffect(() => {
        fetchClientPlot();
    }, []);

    return(
        <ClientPlotBackground>
            <Toaster />
            <TopButtons firstBtn={BiLeftArrowAlt} firstBtnOnClick={() => navigate(-1)} />
            {/* <pre>{JSON.stringify(plotData, null, `\t`)}</pre> */}
            <main className="client_page_main">
                <section className="client_detailes_section">
                    <div className="delete_and_payemnt_client_btn">
                        {
                            plotData?.client?._id ?
                                (<>
                                    <NavLink style={{textDecoration:"none"}} to={`/payment/${plotData?.client?._id}/${plotData?._id}`}>Do Payment</NavLink>
                                    <RiCloseLine className="delete_client_plot" onClick={deleteClientPlot} />
                                </>)
                                :
                                (<Link style={{textDecoration:"none"}} to={`/sell/plot/${plotData?._id}`}><RiUserAddLine/> </Link>)
                        }
                    </div>
                    <div className="client_plot_cont">
                        <span className="status_heading">Name  </span> <span className="status_result"> {plotData?.client?.name}</span>
                        <span className="status_heading">S,W,D/O</span> <span className="status_result">  {plotData?.client?.careTaker}</span>
                        <span className="status_heading">Plot No.     </span> <span className="status_result"> {plotData?.plot_no}</span>
                        <span className="status_heading">Plot Size    </span> <span className="status_result"> {plotData?.size}</span>
                        <span className="status_heading">Plot Rate    </span> <span className="status_result"> {plotData?.rate}</span>
                        <span className="status_heading">Is Sold      </span> <span className="status_result" style={{fontWeight:"bold", color:plotData?.hasSold ? "#00dd00" : "red"}}>  {JSON.stringify(plotData?.hasSold)}</span>





                        <input value={serialNo === "" ? "" : Number(serialNo)||""} type="number" placeholder="Client Serial Number" onChange={(e) => setSerialNo(e.target.value === "" ? "" : parseFloat(e.target.value))} />
                        <input value={clientName} type="text" placeholder="Client Name" onChange={(e) => setClientName(e.target.value)} />
                        <input value={clientCareTaker} type="text" placeholder="Client Care Taker Name" onChange={(e) => setClientCareTaker(e.target.value)} />
                        <button type="submit" onClick={updateClientPlot}>Update</button>
                        
                    </div>
                </section>
            </main>
            <div className="payments_table_cont">
                <table className="payments_cont">
                    <thead>
                        <th>Date</th>
                        <th>Slip No.</th>
                        <th>Mode Of Payment</th>
                        <th>Cheque Number</th>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Receiver Account Number</th>
                        <th>Payment Status</th>
                        <th><button onClick={() => navigate(`/statement`, {state:plotData})}>checkout</button></th>
                    </thead>
                    {
                        plotData?.payments?.map((item, index) => (
                            <tbody key={index} className="payment_cont" style={{background:item.paymentStatus !== "token" && item.paymentStatus !== "emi" ? "#ff9c9c" : "white"}}>
                                <td>{item.createdAt}</td>
                                <td>{item.slipNo}</td>
                                <td>{item.modeOfPayment}</td>
                                <td>{item.chequeNumber}</td>
                                <td>{item.transactionID}</td>
                                <td>{item.amount}</td>
                                <td>{item.receiverAccount}</td>
                                <td><select value={item.paymentStatus} onChange={(e:ChangeEvent<HTMLSelectElement>) => updatePaymentStatus(e.target.value, item._id)} ><option value="token">token</option><option value="emi">emi</option><option value="cancelled">cancelled</option><option value="bounced">bounced</option><option value="wasted">wasted</option></select></td>
                                <td><button style={{background:"white", border:"none", cursor:"pointer"}} onClick={() => {removePayment(item._id)}}><RiDeleteBin2Line color="red" /></button></td>
                            </tbody>
                        ))
                    }
                </table>
            </div>
        </ClientPlotBackground>
    )
}

export default ClientPlot;

const ClientPlotBackground = styled.section`
border:2px solid red;
box-sizing:border-box;
// display:grid;
// grid-template-columns:20% 80%;
// height:100vh;
background:#f4f4f4;
padding:4px;



    .client_page_main{
        // border:2px solid red;
        max-width:800px;
        margin:10px auto;
        background:white;
    }
        .client_page_main h1{
            // border:2px solid red;
            max-width:800px;
            text-align:center;
        }
        .client_detailes_section{
            // border:2px solid violet;
            background:white;
            border-radius:8px;
            padding:10px 0;
            box-shadow:0 4px 16px rgba(0,0,0,0.1);
        }
            .client_detailes_section .delete_and_payemnt_client_btn{
                display:flex;
                justify-content:space-between;
                padding:10px;
            }
                .client_detailes_section .delete_and_payemnt_client_btn .delete_client_plot{
                    color:#b6b260;
                    border-radius:4px;
                    cursor:pointer;
                    font-size:16px;
                }
                .client_detailes_section .delete_and_payemnt_client_btn .delete_client_plot:hover{
                    // color:#b6b260;
                    background:red;
                    color:white;
                }
        .client_page_main .client_plot_cont{
            padding:10px;
            display:grid;
            grid-template-columns:25% 25% 25% 25%;
            grid-template-rows:30px 30px 30px;
        }
            .client_page_main .client_plot_cont span{
                // border:2px solid green;
                width:max-content;
            }
            .client_page_main .client_plot_cont input{
            }
            .client_page_main .client_plot_cont .status_heading{
                font-size:16px;
                font-weight:bold;
            }
            .client_page_main .client_plot_cont .status_result{
                font-size:16px;
                ttext-align:center;
            }
            


    .client_page_main{
        background:#f4f4f4;
    }

    .payments_table_cont{
        // border:2px solid green;
        overflow:auto;
    }

    .payments_cont{
        // border:2px solid violet;
        width:100%;
        min-width:500px
    }
        .payments_cont thead{
        }
            .payments_cont thead th{
                border-left:2px solid gainsboro;
                border-right:2px solid gainsboro;
                border-radius:8px;
            }
        .payments_cont .payment_cont{
        }
            .payments_cont .payment_cont td{
                box-shadow:0px 4px 8px rgba(0,0,0,0.1);
                padding:10px;
                text-align:center;
                border-radius:8px;
            }

    img{
        width:200px;
    }


@media screen and (width <= 400px){
    .client_page_main .client_plot_cont .status_heading{
        font-size:10px;
        font-weight:bold;
    }
    .client_page_main .client_plot_cont .status_result{
        font-size:10px;
        text-align:center;
    }
    .client_page_main .client_plot_cont input{
        font-size:10px;
    }
    .client_page_main .client_plot_cont button{
        font-size:10px;
    }
    .payments_cont thead th{
        font-size:12px;
    }
    .payments_cont .payment_cont td{
        font-size:12px;
    }
}
`;