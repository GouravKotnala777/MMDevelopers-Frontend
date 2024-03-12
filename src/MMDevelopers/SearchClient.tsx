import styled from "styled-components";
import Form from "./components/Form";
import { ChangeEvent, useState } from "react";
import toast, {Toaster} from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import TopButtons from "./components/TopButtons";
import { BiLeftArrowAlt } from "react-icons/bi";

interface SearchClientBodyType {
    name?:string;
    careTaker?:string;
    mobile?:string;
    plot_no?:number;
    site_name?:string;
};

interface SearchedClientType {
    plot_no?:number;
    size?:number;
    site_name?:string;
    client?:{
        name?:string;
        careTaker?:string;
        mobile?:string;
    },
    totalShouldPay?:number;
    totalPaid?:number;
    timeCovered?:number;
    agent?:string;
};

const SearchClient = () => {
    let searchClientSTO:any;
    const [searchQueries, setSearchQueries] = useState<SearchClientBodyType>();
    const [searchedClient, setSearchedClient] = useState<{success:boolean; message:SearchedClientType[]}>();
    const formFields = [
        {label:"Name", type:"text", name:"name", value:searchQueries?.name},
        {label:"Care Take", type:"text", name:"careTaker", value:searchQueries?.careTaker},
        {label:"Mobile Number", type:"text", name:"mobile", value:searchQueries?.mobile},
        {label:"Plot Number", type:"number", name:"plot_no", value:searchQueries?.plot_no},
        {label:"Site Name", type:"text", name:"site_name", value:searchQueries?.site_name}
    ];
    const navigate = useNavigate();



    const searchInputChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setSearchQueries({...searchQueries, [e.target.name]:e.target.value})
    };

    const searchClientByQueries = () => {
        clearTimeout(searchClientSTO);        
        searchClientSTO = setTimeout(async() => {
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/plot/search/client`, {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({name:searchQueries?.name, mobile:searchQueries?.mobile, careTaker:searchQueries?.careTaker, plot_no:searchQueries?.plot_no, site_name:searchQueries?.site_name})
                });

                const data = await res.json();

                console.log("-------- searchClient");
                console.log(data);
                console.log("-------- searchClient");
                
                if (data.success) {
                    toast.loading("Plot Found",{
                        position:"bottom-center",
                        duration:2000
                    });
                    setSearchedClient(data);
                }
                else{
                    toast.error(data.message,{
                        position:"bottom-center",
                        duration:2000
                    });
                    setSearchedClient({success:false, message:[]});
                }
                
            } catch (error) {
                toast.error("Error Occured", {
                    position:"bottom-center",
                    duration:2000
                });
                setSearchedClient({success:false, message:[]});
            }
        }, 1000);
        
    };

    return(
        <SearchClientBackground>
            <Toaster />
            {/* <pre>{JSON.stringify(searchedClient, null, `\t`)}</pre> */}
            <TopButtons firstBtn={BiLeftArrowAlt} firstBtnOnClick={() => navigate(-1)} />
            <Form formHeading="Search User By" formFields={formFields} onClickFunc={searchClientByQueries} onChangeFunc={searchInputChangeHandler} />

            <div className="searched_client_table_cont">
                <table className="searched_client_table">
                    <thead>
                        <th>Name</th>
                        <th>S,W,D/O</th>
                        <th>Mobile No.</th>
                        <th>Plot No.</th>
                        <th>Plot Size</th>
                        <th>Site Name</th>
                        <th>Should Pay</th>
                        <th>Total Paid</th>
                        <th>Time Covered</th>
                        <th>Agent</th>
                    </thead>
                        {
                            searchedClient && searchedClient?.message.map((plot) => (
                                <tbody onClick={() => navigate(`/site_name/${plot.site_name}/plot/${plot.plot_no}/dashboard`)}>
                                    <td>{plot?.client?.name}</td>
                                    <td>{plot?.client?.careTaker}</td>
                                    <td>{plot?.client?.mobile}</td>
                                    <td>{plot.plot_no}</td>
                                    <td>{plot.size}</td>
                                    <td>{plot.site_name}</td>
                                    <td>{plot.totalShouldPay}</td>
                                    <td>{plot.totalPaid}</td>
                                    <td>{plot.timeCovered} Months</td>
                                    <td>{plot.agent}</td>
                                </tbody>
                            ))
                        }

                </table>
            </div>
        </SearchClientBackground>
    )
};

export default SearchClient;

const SearchClientBackground = styled.section`
border:2px solid red;

    .searched_client_table_cont{
        // border:2px solid green;
        overflow-x:auto;
        margin:20px;
    }
        .searched_client_table_cont .searched_client_table{
            // border:2px solid violet;
            margin:0px auto;
            // overflow-x:auto;
            background:white;
        }
            .searched_client_table_cont .searched_client_table thead{
                // border:2px solid indigo;
                background:orange;
                color:white;                
            }
                .searched_client_table_cont .searched_client_table thead th{
                    // border:2px solid blue;
                    text-align:center;
                }
            .searched_client_table_cont .searched_client_table tbody{
                // border:2px solid indigo;
            }
                .searched_client_table_cont .searched_client_table tbody td{
                    // border:2px solid blue;
                    padding:10px 5px;
                    text-align:center;
                    cursor:pointer;
                }
                .searched_client_table_cont .searched_client_table tbody:hover{
                    background:#ffda96;
                }
                .searched_client_table_cont .searched_client_table tbody:active{
                    background:#ffecc7;
                }

@media screen and (width <= 300px){
    // margin:10px;

    .searched_client_table_cont{
        margin:10px;
    }
    .searched_client_table_cont .searched_client_table thead th{
        font-size:12px;
    }
    .searched_client_table_cont .searched_client_table tbody td{
        font-size:12px;
        padding:10px 14px;
    }
}
`;