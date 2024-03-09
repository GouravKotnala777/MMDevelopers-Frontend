import { FC } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ClientBody, PaymentBody } from "./types/types";

interface locationBody {
    state:{
        _id:string;
        client:ClientBody;
        payments:PaymentBody[];
        plot_no:number;
        rate:number;
        site_name:string;
        size:number;
        createdAt:string;
    }
};

const PaymentStatement = () => {
    const location:locationBody = useLocation();
    const navigate = useNavigate();
    
    return(
        <PaymentStatementBackground>
        <RiCloseLine className="cancel_table" onClick={() => navigate(-1)} />
        <div className="statement_table_cont">
            <table className="payments_cont">
                <thead>
                    <th>Date</th>
                    <th>Slip No.</th>
                    <th>Mode Of Payment</th>
                    <th>Cheque Number</th>
                    <th>Transaction ID</th>
                    <th>Amount</th>
                    <th>Receiver Account Number</th>
                </thead>
                {
                    location.state._id && location.state?.payments?.map((item, index) => (
                        <tbody key={index} className="payment_cont">
                            <td>{(item.createdAt.split("T")[0]).split("-").reverse().join("-")}</td>
                            <td>{item.slipNo}</td>
                            <td>{item.modeOfPayment}</td>
                            <td>{item.chequeNumber}</td>
                            <td>{item.transactionID}</td>
                            <td>{item.amount}</td>
                            <td>{item.receiverAccount}</td>
                        </tbody>
                    ))
                }
            </table>
        </div>
        </PaymentStatementBackground>
    )
};

export default PaymentStatement;

const PaymentStatementBackground = styled.section`
background:#fff8d7;
// border:2px solid green;
// width:100%;
// min-width:500px;
text-align:right;

.cancel_table{
    // border:2px solid red;
    color:#b6b260;
    cursor:pointer;
    margin-right:5px;
    font-size:20px;
}
.statement_table_cont{
    // border:2px solid blue;
    overflow:auto;
    text-align:center;
}
    .payments_cont{
        // border:2px solid violet;
        width:100%;
        min-width:500px;
        font-family:Cutive Mono;
        padding:10px 0;
        // color:gray;
        font-size:14px;
    }
        .payments_cont .payment_cont{
        }
        .payments_cont thead{
        }
            .payments_cont thead th{
                border-left:1.5px dashed #b6b260;
                border-bottom:1.5px dashed #b6b260;
                // font-size:14px;
            }
        .payments_cont .payment_cont{
        }
            .payments_cont .payment_cont td{
                // box-shadow:0px 4px 8px rgba(0,0,0,0.1);
                // padding:10px;
                // text-align:center;
                // border-radius:8px;
                // background:white;

                
                
                padding:10px;
                text-align:center;
                border-left:1.5px dashed #b6b260;
                // font-size:14px;
                // border-radius:8px;
                // background:#fff1b9;
            }
`;