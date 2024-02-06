import { FC } from "react";
import SideBar from "../components/AdminSideBar";
import styled from "styled-components";
import { IoMdSearch, IoMdTrendingDown, IoMdTrendingUp } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineBell } from "react-icons/ai";
import { BiMaleFemale } from "react-icons/bi";
import { IconType } from "react-icons";
import { BarChart, DoughnutChart } from "../components/Charts";
import Table from "../components/DashboardTable";
import HomePage from "../HomePage";

const tableData = [
    {"id":"dalkjsdkla","amount":1000,"quantity":1,"discount":100,"status":"Processing"},
    {"id":"dalkjsdkla","amount":2000,"quantity":2,"discount":200,"status":"Processing"},
    {"id":"dalkjsdkla","amount":3000,"quantity":3,"discount":300,"status":"Shipped"},
    {"id":"dalkjsdkla","amount":4000,"quantity":4,"discount":400,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
    {"id":"dalkjsdkla","amount":5000,"quantity":5,"discount":500,"status":"Processing"},
];


const Dashboard:FC = () => {
    // 01:49:00
    // const tabs = Table([{"id":"dalkjsdkla","amount":1000,"quantity":1,"discount":100,"status":"Processing"}]);
    
    return(
        <DashboardBackground>
            <SideBar />
            <HomePage/>
            <main className="dashboard_main">
                <section className="section1">
                    <IoMdSearch className="aaa" />
                    <input className="input1" placeholder="search user by date, order, product" />
                    <AiOutlineBell className="aaa" />
                    <FaUserCircle className="aaa" />    
                </section>


                <section className="dashboard_widget_section">
                    <Widget heading="Revenue" amount={1000} percentage={-20} />
                    <Widget heading="Customers" amount={1000} percentage={20} />
                    <Widget heading="Products" amount={1000} percentage={0} />
                    <Widget heading="Transaction" amount={1000} percentage={50} />
                </section>



                <section className="dashboard_widget_section">
                    <div className="chart">
                        <h4>Revenue Transaction Chart</h4>
                        <BarChart horizontal={false} data1={[1, 2, 3, 4, 5, 6, 7]} data2={[2, 4, 6, 8, 10, 12, 14]} title1="Revenue" title2="Transaction" bgColor1="rgb(0, 115, 255)" bgColor2="rgba(53, 162, 235, 0.8" />
                    </div>
                    <div className="inventory_cont">
                        <h4>Inventory</h4>
                        <div className="inventory_item">
                            <InventoryWidget heading="Electronic" percentage={0} />
                            <InventoryWidget heading="Electronic" percentage={2} />
                            <InventoryWidget heading="Electronic" percentage={4} />
                            <InventoryWidget heading="Electronic" percentage={6 } />
                            <InventoryWidget heading="Electronic" percentage={8} />
                            <InventoryWidget heading="Electronic" percentage={10} />
                            <InventoryWidget heading="Foot Wear" percentage={20} />
                            <InventoryWidget heading="Food" percentage={30} />
                            <InventoryWidget heading="Toys" percentage={40} />
                            <InventoryWidget heading="Toys" percentage={50} />
                            <InventoryWidget heading="Toys" percentage={60} />
                            <InventoryWidget heading="Toys" percentage={70} />
                            <InventoryWidget heading="Toys" percentage={80} />
                            <InventoryWidget heading="Toys" percentage={90} />
                            <InventoryWidget heading="Toys" percentage={92} />
                            <InventoryWidget heading="Toys" percentage={94} />
                            <InventoryWidget heading="Toys" percentage={96} />
                            <InventoryWidget heading="Toys" percentage={98} />
                            <InventoryWidget heading="Toys" percentage={99} />
                            <InventoryWidget heading="Toys" percentage={100} />

                        </div>
                    </div>
                </section>

                <section className="dashboard_widget_section">
                    <div className="gender_chart_cont">
                        <h4>Gender Ratio</h4>
                        <BiMaleFemale className="bi_male_female" />
                        <div className="gender_chart_wrapper">
                            <DoughnutChart labels={["Male", "Female"]} data={[12, 19]} backgroundColor={["rgb(63, 181, 255)", "rgb(255, 0, 212)"]} cutout={90} />
                        </div>
                    </div>

                    <div className="transaction_chart_cont">
                        <Table data={tableData} />
                    </div>
                </section>
                
            </main>
        </DashboardBackground>
    )
}

export default Dashboard;

const Widget = ({heading, amount, percentage}:{heading:string; amount:number; percentage:number;}) => {
    let color:string;
    let Icon:IconType;
    color = percentage > 0 ? "green" : percentage === 0 ? "orange" : "red";
    Icon = percentage > 0 ? IoMdTrendingUp : IoMdTrendingDown;
    
    return(
    
    <article className="widget_article">
        <div className="left_part">
            <div className="heading">{heading}</div>
            <div className="amount">{amount}₹</div>
            <div className="status" style={{color}} ><Icon /> {percentage}%</div>
        </div>
        <div className="right_part" style={{background: `conic-gradient(${color} ${Math.abs(percentage)*360/100}deg, #f4f4f4 ${0})`}}>
            <div className="percentage" style={{color}}>{percentage}%</div>
        </div>
    </article>
)};

const InventoryWidget = ({heading, percentage}:{heading:string; percentage:number;}) => {
    return(
        <>
            <div className="category_name">{heading}</div>
            <div className="category_meter">
                <div className="merter_filled_line" style={{width:`${percentage}%`, borderBottom:`4.5px solid hsl(${percentage-10}, 100%, 48%)`}}>
                </div>
                <div className="merter_empty_line" style={{width:`${100 - percentage}%`, borderBottom:`4.5px solid hsl(${percentage-10}, 100%, 94%)`}}>
                </div>
            </div>
            <div className="inventory-percentage">{percentage}%</div>
        </>
    )
};

const DashboardBackground = styled.section`
box-sizing:border-box;
// border:2px solid red;
display:grid;
grid-template-columns:20% 80%;
// height:91vh;
    .aa{
        // border:2px solid blue;
        height:100%;
    }
    
    .dashboard_main{
        // border:2px solid green;
        background:rgb(240, 240, 240);
        overflow:auto;
    }
    .dashboard_main .section1{
        // display:flex;
        display:grid;
        grid-template-columns:3% 91% 3% 3%;
        border-bottom:2px solid gray;
        margin:0.5rem;
    }
    .dashboard_main .section1 .input1{
        outline:none;
        // margin-right:auto;
        // width:95%;
        // border:2px solid red;
        // border:2px solid ;
        padding:0.2rem;
        font-size:1.1rem;
    }
    .aaa{
        // border:2px solid blue;
        width:100%;
        height:100%;
        background:white;
    }




    // -------------------     Section2
    .dashboard_main .dashboard_widget_section{
        // border:2px solid violet;
        display:flex;
        flex-wrap:wrap;
        justify-content:space-around;
        max-width:1200px;
        margin:0 auto;
    }
        .dashboard_main .dashboard_widget_section .widget_article{
            // border:2px solid blue;
            width:250px;
            height:150px;
            display:grid;
            grid-template-columns:45% 55%;
            padding:10px;
            margin:10px;
            border-radius:8px;
            background:white;
            box-shadow:0 4px 8px rgba(0,0,0,0.1);
        }
            .dashboard_main .dashboard_widget_section .widget_article .left_part{
                // border:2px solid indigo;
                text-align:center;
                display:flex;
                flex-direction:column;
                justify-content:space-around;
            }
                .dashboard_main .dashboard_widget_section .widget_article .left_part .heading{
                    // border:2px solid green;
                    font-weight:bold;
                }
                .dashboard_main .dashboard_widget_section .widget_article .left_part .amount{
                    // border:2px solid yellow;
                    font-weight:bold;
                }
                .dashboard_main .dashboard_widget_section .widget_article .left_part .status{
                    // border:2px solid orange;
                    display:flex;
                    justify-content:space-around;
                    font-weight:bold;
                }
            .dashboard_main .dashboard_widget_section .widget_article .right_part{
                // border:2px solid red;
                display:grid;
                place-content:center;
                border-radius:50%;
            }
                .dashboard_main .dashboard_widget_section .widget_article .right_part .percentage{
                    // border:2px solid green;
                    border-radius:50%;
                    width:100px;
                    height:100px;
                    display:grid;
                    place-content:center;
                    background:white;
                }
    // =========================  Section2




    // -------------------                             dashboard_widget_Section


    // .dashboard_main .dashboard_widget_section{
    //     // border:2px solid red;
    //     display:grid;
    //     grid-template-columns:75% 25%;
    //     // padding:0.4rem;
    //     height:70%;
    // }
        .dashboard_main .dashboard_widget_section .chart{
            // border:2px solid violet;
            flex:1;
            margin:10px;
            border-radius:8px;
            padding:10px;
            background:white;
            box-shadow:0 4px 8px rgba(0,0,0,0.1);
        }
        .dashboard_main .dashboard_widget_section h4{
            // border:2px solid blue;
            text-align:center;
            font-size:18px;
            font-weight:bold;
        }
        .dashboard_main .dashboard_widget_section .inventory_cont{
            // border:2px solid indigo;
            flex:1;
            margin:10px;
            background:white;
            overflow:scroll;
            height:30rem;
            min-width:250px;
            box-shadow:0 4px 8px rgba(0,0,0,0.1);
        }
            .dashboard_main .dashboard_widget_section .inventory_cont h4{
                // border:2px solid blue;
                text-align:center;
                font-size:18px;
                font-weight:bold;
            }
            .dashboard_main .dashboard_widget_section .inventory_cont .inventory_item{
                // border:2px solid green;
                display:grid;
                grid-template-columns:40% 50% 10%;
                align-items:center;
            }
                .dashboard_widget_section .inventory_cont .inventory_item .category_name{
                    // border:2px solid red;
                    text-align:center;
                    margin:0.2rem 0 0.2rem 0.2rem;
                }
                .dashboard_widget_section .inventory_cont .inventory_item .category_meter{
                    display:flex;
                    border-top:1px solid gainsboro;
                    border-left:1px solid gray;
                    border-right:1px solid gray;
                    border-bottom:2px solid gray;
                    height:0.5rem;
                    border-radius:5px;
                    margin:0.2rem;
                }
                .dashboard_widget_section .inventory_cont .inventory_item .inventory-percentage{
                    // border:2px solid blue;
                }
                    .dashboard_widget_section .inventory_cont .inventory_item .category_meter .merter_filled_line{
                        // border:3.5px solid hsl(120, 100%, 50%);
                        // width:50%;
                    }
                    .dashboard_widget_section .inventory_cont .inventory_item .category_meter .merter_empty_line{
                        // border:3.5px solid hsl(120, 100%, 95%);
                        // width:50%;
                    }

        // =========================  dashboard_widget_Section




        // -------------------                             Section 4

    // .dashboard_main .dashboard_widget_section{
    //     // border:2px solid red;
    //     display:grid;
    //     grid-template-columns: 39% 59%;
    //     place-content:center;
    // }
    .dashboard_main .dashboard_widget_section .gender_chart_cont{
        // border:2px solid violet;
        // flex:1;
        margin:10px;
        padding:10px;
        border-radius:8px;
        background:white;
        position:relative;
        box-shadow:0 4px 8px rgba(0,0,0,0.1);
    }
        .dashboard_main .dashboard_widget_section .gender_chart_cont h4{
            // border:2px solid indigo;
        }
        .dashboard_main .dashboard_widget_section .gender_chart_cont .bi_male_female{
            // border:2px solid green;
            position:absolute;
            top:41%;
            left:51%;
            transform:translate(-50%, -50%);
            width:60px;
            height:60px
        }
        .dashboard_main .dashboard_widget_section .gender_chart_cont .gender_chart_wrapper{
            // border:2px solid green;
            width:100%;

        }
    .dashboard_widget_section .transaction_chart_cont{
        // border:2px solid yellow;
        // flex:1;
        margin:10px;
        padding:10px 14px;
        background:white;
        height:21.7rem;
        overflow:scroll;
        box-shadow:0 4px 8px rgba(0,0,0,0.1);
    }

    // =========================  Section 4


@media screen and (width <= 600px){
grid-template-columns:100%;
z-index:2;
}

`;