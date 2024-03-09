import { useEffect, useState } from "react";
import { BiLeftArrowAlt, BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { IoIosDocument } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { PlotDashboard } from "./types/types";
import TopButtons from "./components/TopButtons";


const ClientDashboard = () => {
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
        hasSold:false,
        duration:0,
        totalPaid:0,
        downPayment:0,
        timeCovered:0,
        agent:""
    });
    const navigate = useNavigate();
    const {size, rate, duration, timeCovered, totalPaid} = plotData;
    const emi = isNaN((size*rate) / plotData.duration) ? 0 : ((size*rate) / plotData.duration);
    const shouldPay = emi * timeCovered;
    const pending = shouldPay - totalPaid;
    const pendingBarWidth = isNaN(((((size*rate)/plotData.duration) * plotData.timeCovered) - (plotData.totalPaid)) / (size*rate)) ? 0 : (((((size*rate)/plotData.duration) * plotData.timeCovered) - (plotData.totalPaid)) / (size*rate));
    

    const fetchClientPlot = async() => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/plot/site_name/${name}/plot/${plot_no}`, {
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            });
    
            console.log("----------- ClientDashboard.tsx");
            const data = await res.json();
            setPlotData(data.message);
            console.log(data);
            console.log("----------- ClientDashboard.tsx");
            
        } catch (error) {
            console.log(error);
        }
    };
    

    useEffect(() => {
        fetchClientPlot();
    }, []);


    return(
        <ClientDashboardBackground>
            <TopButtons firstBtn={BiLeftArrowAlt} firstBtnOnClick={() => navigate(-1)} lastBtn={IoIosDocument} lastBtnOnClick={() => navigate("/statement", {state:plotData})} />
            
            {/* <pre>{JSON.stringify(plotData, null, `\t`)}</pre> */}
            <section className="plot_meter_section">
                <div className="plot_stock_bar_cont">
                    <div className="bar_labels">
                        <div>{/* 0 */}{/*<BiSolidDownArrow className="left_pointer"/>*/}</div>
                        <div>{size*rate}<BiSolidDownArrow className="right_pointer"/></div>
                    </div>
                    <div className="plot_stock_bar">
                        {
                            (isNaN((shouldPay-totalPaid) / (size*rate)) ? 0 : ((shouldPay-totalPaid) / (size*rate)) * 100) > 0 ?
                                <>
                                    <div className="plot_stock_bar_left" style={{width:`${isNaN(totalPaid/(size*rate)) ? 0 : (totalPaid/(size*rate))*100}%`}}>
                                    {/* <div className="plot_stock_bar_left" style={{width:`${(plotData.totalPaid / (plotData.size * plotData.rate)) * 100}%`}}> */}
                                        <div className="bar_pointer"><BiSolidUpArrow className="left_pointer"/></div>
                                        <p className="bar_value">{plotData.totalPaid}</p>
                                    </div>
                                    <div className="plot_stock_bar_pending" style={{width:`${(pendingBarWidth) * 100}%`, borderTop:"6px solid #ff7070", borderBottom:"6px solid #ff7070"}}>
                                        <div className="bar_pointer"><BiSolidDownArrow className="left_pointer"/></div>
                                        <p className="bar_value" style={{color:(plotData.totalPaid) - ((emi) * plotData.timeCovered) > 0 ? "#00dd00" : "#dd0000"}}>{(plotData.totalPaid) - ((emi) * plotData.timeCovered)}</p>
                                    </div>
                                </>
                                :
                                <>
                                    <div className="plot_stock_bar_left" style={{width:`${isNaN(shouldPay/(size*rate)) ? 0 : (shouldPay/(size*rate))*100}%`}}>
                                        <div className="bar_pointer"><BiSolidUpArrow className="left_pointer"/></div>
                                        <p className="bar_value">{emi * plotData.timeCovered}</p>
                                    </div>
                                    <div className="plot_stock_bar_pending" style={{width:`${isNaN((totalPaid - shouldPay)/(size*rate)) ? 0 : ((totalPaid - shouldPay)/(size*rate))*100}%`, borderTop:"6px solid #90ff90", borderBottom:"6px solid #90ff90"}}>
                                        <div className="bar_pointer"><BiSolidDownArrow className="left_pointer"/></div>
                                        <p className="bar_value" style={{color:(totalPaid - shouldPay) >= 0 ? "#00dd00" : "#dd0000"}}>{`+${totalPaid - shouldPay}`}</p>
                                    </div>
                                </>
                        }
                   </div>
                </div>
            </section>


            <DashboardWidget headings={["Plot No.", "Plot Size", "Plot Rate", "Total Price", "Monthly EMI"]} values={[plotData.plot_no, plotData.size, plotData.rate, size*rate, emi]} />

            {
                plotData.client?.name &&
                    <DashboardWidget headings={["Name", "W,S,D/O", "Mobile"]} values={[plotData.client.name, plotData.client?.careTaker, plotData.client?.mobile]} />
            }

            {
                plotData.client?.address &&
                    <DashboardWidget headings={["Address"]} values={[plotData.client?.address]} />
            }

            {
                plotData.payments?.length &&
                    <section className="time_meter_section">
                        <p>Time</p>
                        <div className="time_meter_cont">
                            {/* <div className="time_meter_circle1" style={{background:`conic-gradient(#00dd00 ${(360/plotData.duration) * plotData.timeCovered}deg, #f4f4f4 0)`}}> */}
                            {/* <div className="time_meter_circle1" style={{background: plotData.timeCovered <= plotData.duration ? `conic-gradient(#00dd00 ${(360/42) * 42}deg, #f4f4f4 0)` : `conic-gradient(#00ff00 ${((360/43) * 42) - 360}deg, #00dd00 0)`}}> */}
                            <div className="time_meter_circle1" style={{background: plotData.timeCovered <= plotData.duration ? `conic-gradient(#00dd00 ${(360/plotData.duration) * plotData.timeCovered}deg, #f0f0f0 0)` : `conic-gradient(#ff0000 ${((360/plotData.duration) * plotData.timeCovered) - 360}deg, #99dd99 0)`}}>
                                <div className="time_meter_circle2">
                                    <h3>{plotData.timeCovered}/{plotData.duration}</h3>
                                    {
                                        (plotData.duration - plotData.timeCovered) < 0 ?
                                            <p style={{color: (plotData.duration - plotData.timeCovered) < 0 ? "#ee0000" : "#00aa00" }}>{(plotData.duration - plotData.timeCovered)} months over</p>
                                            :
                                            <p style={{color: (plotData.duration - plotData.timeCovered) < 0 ? "#ee0000" : "#00aa00" }}>{(plotData.duration - plotData.timeCovered)} months remaining</p>
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
            }


            {
                plotData.payments?.length &&
                    <DashboardWidget headings={["Should Pay", "Paid", "Total Balance"]} values={[(emi) * (plotData.timeCovered), (plotData.totalPaid), (size*rate) - (totalPaid)]} />
            }

            {
                plotData.payments?.length &&
                <DashboardWidget headings={["First Payment", "Date", "Amount", "Last Payment", "Date", "Amount"]} values={["", (plotData.payments && plotData.payments[0].createdAt)?.split("T")[0], plotData.payments && plotData.payments[0].amount, "", (plotData.payments && plotData.payments[plotData.payments?.length - 1].createdAt)?.split("T")[0], plotData.payments && plotData.payments[0].amount]} />
            }
            {
                // <DashboardWidget headings={["T.L"]} values={[plotData.agent]} />
                plotData.payments?.length &&
                    <section className="payment_detailes_section">
                        <div className="payment_detailes">
                            <p className="headings">T.L.</p><p className="values">{plotData.agent}</p>
                        </div>
                    </section>
            }
        </ClientDashboardBackground>
    )
};


const DashboardWidget = ({headings, values}:{headings:string[]; values:(string|number)[]}) => (
    <section className="widget_detailes_section">
        <div className="widget_detailes">
            {
                headings.map((heading, index) => (
                    <>
                        <p className="headings">{heading}</p>
                        <p className="values">{values[index]}</p>
                    </>
                ))
            }
        </div>
    </section>
)

export default ClientDashboard;

const ClientDashboardBackground = styled.section`
border:2px solid red;
display:flex;
padding:10px 20px;
justify-content:space-around;
flex-wrap:wrap;
font-size:14px;
background:#f4f4f4;

    .plot_meter_section{
        // border:2px solid blue;
        width:100%;
        min-width:230px;
        border-radius:8px;
        background:white;
        padding:5px;
    }
        .plot_meter_section .plot_stock_bar_cont{
            // border:2px solid violet;
            display:flex;
            flex-direction:column;
            height:80px;
            padding:0 10px;
        }
            .plot_meter_section .plot_stock_bar_cont .bar_labels{
                // border:2px solid indigo;
                display:flex;
                justify-content:space-between;
            }
                .plot_meter_section .plot_stock_bar_cont .bar_labels div{
                    // border:2px solid green;
                    position:relative;
                    padding:4px 0;
                }
                    .plot_meter_section .plot_stock_bar_cont .bar_labels div .left_pointer{
                        // border:2px solid green;
                        position:absolute;
                        left:-4px;
                        bottom:-8px;
                        padding:2px;
                    }
                    .plot_meter_section .plot_stock_bar_cont .bar_labels div .right_pointer{
                        // border:2px solid green;
                        position:absolute;
                        right:6px;
                        bottom:-8px;
                        padding:2px;
                    }
            .plot_meter_section .plot_stock_bar_cont .plot_stock_bar{
                // border:2px solid blue;
                border-top:1px solid gray;
                border-left:1px solid gray;
                border-right:1px solid gray;
                border-bottom:2px solid gray;
                display:flex;
                margin:5px 0;
                border-radius:6px;
                margin-right:10px;
                background:white;
            }
                .plot_meter_section .plot_stock_bar_cont .plot_stock_bar .plot_stock_bar_left{
                    border-top:6px solid #00dd00;
                    border-bottom:6px solid #00dd00;
                    position:relative;
                    border-radius:4px 0 0 4px;
                }
                    .plot_meter_section .plot_stock_bar_cont .plot_stock_bar .plot_stock_bar_left .bar_pointer{
                        // border:1px solid red;
                        position:absolute;
                        top:3px;
                        right:-8px;
                    }
                        .plot_meter_section .plot_stock_bar_cont .plot_stock_bar .plot_stock_bar_left .bar_pointer .left_pointer{
                            // border:1px solid blue;
                            padding:2px;
                        }
                    .plot_meter_section .plot_stock_bar_cont .plot_stock_bar .plot_stock_bar_left .bar_value{
                        // border:1px solid red;
                        position:absolute;
                        top:-4px;
                        right:-16px;
                    }

                .plot_meter_section .plot_stock_bar_cont .plot_stock_bar .plot_stock_bar_pending{
                    // border-top:6px solid black;
                    // border-bottom:6px solid black;
                    position:relative;
                }
                    .plot_meter_section .plot_stock_bar_cont .plot_stock_bar .plot_stock_bar_pending .bar_pointer{
                        // border:1px solid red;
                        position:absolute;
                        right:-4px;
                        bottom:2px;
                    }
                        .plot_meter_section .plot_stock_bar_cont .plot_stock_bar .plot_stock_bar_pending .bar_pointer .left_pointer{
                            // border:1px solid blue;
                            padding:2px;
                        }
                    .plot_meter_section .plot_stock_bar_cont .plot_stock_bar .plot_stock_bar_pending .bar_value{
                        // border:1px solid red;
                        position:absolute;
                        right:-12px;
                        bottom:3px;
                    }


    .widget_detailes_section{
        // border:2px solid violet;   
        width:300px;
        border-radius:8px;
        background:white;
        margin-top:10px;
        min-width:230px;
    }
        .widget_detailes_section .widget_detailes{
            // border:2px solid indigo;
            display:grid;
            grid-template-columns:40% 40%;
            justify-content:space-around;
        }
            .widget_detailes_section .widget_detailes .headings{
                // border:2px solid blue;
                font-weight:bold;
            }
            .widget_detailes_section .widget_detailes .values{
                // border:2px solid blue;
            }
    .time_meter_section{
        // border:2px solid violet;
        width:300px;
        min-width:230px;
        border-radius:8px;
        background:white;
        margin-top:10px;
        padding:10px;
    }
        .time_meter_section p{
            // border:2px solid indigo;
            margin:4px auto;
            text-align:center;
            background:white;
            font-weight:bold;
        }
        .time_meter_section .time_meter_cont{
            // border:2px solid blue;
            min-width:215px;
            height:200px;
        }
            .time_meter_section .time_meter_cont .time_meter_circle1{
                // border:2px solid green;
                width:160px;
                height:160px;
                margin:20px auto;
                padding:15px;
                border-radius:50%;
            }
                .time_meter_section .time_meter_cont .time_meter_circle2{
                    // border:2px solid red;
                    width:127px;
                    height:127px;
                    border-radius:50%;
                    display:grid;
                    place-content:center;
                    background:white;
                }
                    .time_meter_section .time_meter_cont .time_meter_circle2 h3{
                        // border:2px solid orange;
                        font-weight:bold;
                        text-align:center;
                    }
                    .time_meter_section .time_meter_cont .time_meter_circle2 p{
                        // border:2px solid orange;
                        font-weight:500;
                        background:transparent;
                    }

    
    .payment_detailes_section{
        // border:2px solid violet;
        width:300px;
        border-radius:8px;
        background:linear-gradient(90deg, rgb(255, 49, 83), rgb(255, 118, 59));
        margin-top:10px;
        min-width:230px;
    }
        .payment_detailes_section .payment_detailes{
            // border:2px solid indigo;
            display:grid;
            grid-template-columns:40% 40%;
            justify-content:space-around;
        }
            .payment_detailes_section .payment_detailes .headings{
                // border:2px solid blue;
                font-weight:bold;
            }
            .payment_detailes_section .payment_detailes .values{
                // border:2px solid green;
            }
`;