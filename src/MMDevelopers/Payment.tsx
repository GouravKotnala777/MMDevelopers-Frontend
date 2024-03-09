import {ChangeEvent, FC, useState} from "react";
import styled from "styled-components";
import Form from "./components/Form";
import { useNavigate, useParams } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import toast, {Toaster} from "react-hot-toast";
import { PaymentFormType } from "./types/types";




const Paymnet = () => {
    const {plotID} = useParams();
    const {clientID} = useParams();
    const [formData, setFormData] = useState<PaymentFormType>();
    const navigate = useNavigate();
    
    const selectOptions = [
        {label:"Cash", value:"cash"},
        {label:"Cheque", value:"cheque"},
        {label:"Transfer", value:"transfer"},
    ];

    const formFields = formData?.modeOfPayment === "cash" || formData?.modeOfPayment === "" || formData?.modeOfPayment === undefined ?  
        [
            {label:"Slip Number", type:"number", name:"slipNo", value:formData?.slipNo},
            {label:"Amount", type:"number", name:"amount", value:formData?.amount},
            {label:"Mode Of Payment", type:"select", name:"modeOfPayment", value:formData?.modeOfPayment},
            {label:"Payment Status", type:"text", name:"paymentStatus", value:formData?.paymentStatus}
        ]
        :
        [
            {label:"Slip Number", type:"number", name:"slipNo", value:formData?.slipNo},
            {label:"Amount", type:"number", name:"amount", value:formData?.amount},
            {label:"Mode Of Payment", type:"select", name:"modeOfPayment", value:formData?.modeOfPayment},
            {label:formData?.modeOfPayment === "cheque" ? "Cheque Number" : "Transaction ID", type:"number", name:formData?.modeOfPayment === "cheque" ? "chequeNumber" : "transactionID", value:formData?.modeOfPayment === "cheque" ? formData?.chequeNumber : formData.transactionID},
            {label:"Receiver's Account No.", type:"number", name:"receiverAccount", value:formData?.receiverAccount},
            {label:"Payment Status", type:"text", name:"paymentStatus", value:formData?.paymentStatus}
        ]
    ;
    

    const changeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };

    
    const doPayment = async() => {
        try{
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/payment/new/${clientID}/${plotID}`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({slipNo:formData?.slipNo, amount:formData?.amount, modeOfPayment:formData?.modeOfPayment, transactionID:formData?.transactionID, chequeNumber:formData?.chequeNumber, receiverAccount:formData?.receiverAccount, paymentStatus:formData?.paymentStatus})
            });
            
            const data = await res.json();

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
        }
        catch (error) {
          console.log(error);
          toast.error("Error Occured", {
              position:"bottom-center",
              duration:1000
          });
        }
     }
    



    return(
        <PaymnetBackground>

            <main className="paymnet_page_main">
                <Toaster />
                <div className="close_payment_cont">
                    <RiCloseLine className="close_payment" onClick={() => navigate(-1)} />
                </div>
                <Form formHeading="Do Payment" formFields={formFields} selectOptions={selectOptions} onChangeFunc={changeHandler} onClickFunc={doPayment} />
            </main>
        </PaymnetBackground>
    )
}

export default Paymnet;

const PaymnetBackground = styled.section`
border:2px solid red;
box-sizing:border-box;
// display:grid;
// grid-template-columns:20% 80%;
height:100vh;

    .paymnet_page_main{
        background:#f4f4f4;
    }
        .paymnet_page_main .close_payment_cont{
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