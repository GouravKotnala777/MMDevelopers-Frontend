import {ChangeEvent, FC, useEffect, useState} from "react";
import styled from "styled-components";
import Form from "./components/Form";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { AllClientsState } from "./types/types";




const Client = () => {
    const [allClients, setAllClients] = useState<AllClientsState[]>();
    const navigate = useNavigate();

    const fetchAllClients = async() => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/client/all`, {
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });
        const data = await res.json();

        console.log("-------- fetchAllClients Client.tsx");
        console.log(data);
        setAllClients(data.message)
        console.log("-------- fetchAllClients Client.tsx");
        
    }

    const deleteClient = async(clientID:number) => {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/client/${clientID}`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        });

        const data = await res.json();

        console.log("-------- deleteClient Client.tsx");
        console.log(data);
        console.log("-------- deleteClient Client.tsx");
        fetchAllClients();
    };

    useEffect(() => {
        fetchAllClients();
    }, []);
    return(
        <ClientBackground>
            <main className="client_page_main">
                Client Page
                <button onClick={() => navigate(-1)}>Go to back</button>
                {/* <Form formFields={formFields} /> */}

                <table className="clients_table">
                    <thead className="client_table_head"><th>Code</th><th>Name</th><th>Care Taker Name</th></thead>
                    {
                        allClients?.map((item, index) => (
                            <tbody key={index} className="client_table_body">
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.careTaker}</td>
                                <td onClick={() => {deleteClient(item._id)}}><RiDeleteBin2Fill color="#ff763b"/></td>
                            </tbody>
                        ))
                    }
                </table>
            </main>
        </ClientBackground>
    )
}

export default Client;

const ClientBackground = styled.section`
border:2px solid red;
box-sizing:border-box;
// display:grid;
// grid-template-columns:20% 80%;
height:100vh;

    .client_page_main{
        background:#f4f4f4;
    }
        .client_page_main .clients_table{
            border:2px solid red;
            width:100%;
            padding:10px;
        }
            .client_page_main .clients_table .client_table_head{
                // display:flex;
            }
            .client_page_main .clients_table .client_table_body{
                // width:50px;
                border:2px solid green;
            }
                .client_page_main .clients_table .client_table_body td{
                    // width:max-content;
                    // border:2px solid green;
                    // margin-left:10px;
                    box-shadow:0px 4px 8px rgba(0,0,0,0.1);
                    padding:10px;
                    text-align:center;
                    border-radius:8px;
                    background:white;
                }

    img{
        width:200px;
    }


// @media screen and (width <= 600px){
// grid-template-columns:100%;
// z-index:4;
// }
`;