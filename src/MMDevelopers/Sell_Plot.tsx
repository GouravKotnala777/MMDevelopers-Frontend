import {ChangeEvent, FC, useState} from "react";
import styled from "styled-components";
import Form from "./components/Form";
import { useNavigate, useParams } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import { RiCloseLine } from "react-icons/ri";

interface SellPlotBody {
    code?:number;
    name?:string;
    careTaker?:string;
    slipNo?:number;
    amount?:number;
    modeOfPayment?:"cash"|"transfer"|"cheque";
    transactionID?:number;
    chequeNumber?:number;
    receiverAccount?:number;
    agent?:string;
    address?:string;
    mobile?:number;
};

const SellPlot:FC = () => {
    const {plotID} = useParams();
    const[sellPlot, setSellPlot] = useState<SellPlotBody>();
    const selectOptions = [
        {label:"Cash", value:"cash"},
        {label:"Transfer", value:"transfer"},
        {label:"Cheque", value:"cheque"}
    ];
    const formFields = [
        {label:"Serial No", type:"number", name:"code", value:sellPlot?.code},
        {label:"Name", type:"text", name:"name", value:sellPlot?.name},
        {label:"Care Taker", type:"text", name:"careTaker", value:sellPlot?.careTaker},
        {label:"Address", type:"text", name:"address", value:sellPlot?.address},
        {label:"Mobile", type:"number", name:"mobile", value:sellPlot?.mobile},
        {label:"Slip Number", type:"number", name:"slipNo", value:sellPlot?.slipNo},
        {label:"Amount", type:"number", name:"amount", value:sellPlot?.amount},
        {label:"Agent", type:"string", name:"agent", value:sellPlot?.agent},
    ];
    
    const navigate = useNavigate();

    const changeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setSellPlot({...sellPlot, [e.target.name]:e.target.value});
    };
    const sellPlotToClient = async():Promise<void> => {
        console.log({sellPlot});
        
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/plot/sell/plot/${plotID}`, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({plotID, code:sellPlot?.code, name:sellPlot?.name, careTaker:sellPlot?.careTaker, mobile:sellPlot?.mobile, address:sellPlot?.address, slipNo:sellPlot?.slipNo, amount:sellPlot?.amount, modeOfPayment:"cash", agent:sellPlot?.agent})
            });
    
            const data = await res.json();
    
            console.log("----------- sell this plot Sell_Plot");
            console.log({data});
            console.log("----------- sell this plot Sell_Plot");
            
            if (data.success) {
                toast.success(data.message, {
                    position:"bottom-center",
                    duration:1000
                });
                setTimeout(() => {
                    navigate(-1);
                }, 1400);

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
        
        
    };
    
    return(
        <SellPlotBackground>
            <Toaster />
            <main className="sell_plot_page_main">
                <div className="close_payment_cont">
                    <RiCloseLine className="close_payment" onClick={() => navigate(-1)} />
                </div>
                <Form formHeading="Sell This Plot" formFields={formFields} onClickFunc={sellPlotToClient} onChangeFunc={changeHandler}/>                
            </main>
        </SellPlotBackground>
    )
}

export default SellPlot;

const SellPlotBackground = styled.section`
border:2px solid red;
box-sizing:border-box;
// display:grid;
// grid-template-columns:20% 80%;
height:100vh;

    .sell_plot_page_main{
        background:#f4f4f4;
    }
        .sell_plot_page_main .close_payment_cont{
            text-align:right;
        }
            .paymnet_page_main .close_payment_cont .close_payment{
                // border:2px solid red;
                font-size:22px;
                margin-right:5px;
                cursor:pointer;
            }
            .paymnet_page_main .close_payment_cont .close_payment:hover{
                color:red;
            }


    img{
        width:200px;
    }


// @media screen and (width <= 600px){
// grid-template-columns:100%;
// z-index:4;
// }
`;