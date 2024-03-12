import {ChangeEvent, FC, useState} from "react";
import styled from "styled-components";
import Form from "./components/Form";
import { useNavigate, useParams } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import { AddPlotState } from "./types/types";
import TopButtons from "./components/TopButtons";
import { BiLeftArrowAlt } from "react-icons/bi";




const AddPlot = () => {
    const {name} = useParams();
    const [formData, setFormData] = useState<AddPlotState>();
    const navigate = useNavigate();
    const formFields = [
        {label:"Plot Number", type:"number", name:"plot_no", value:formData?.plot_no},
        {label:"Plot Size", type:"number", name:"size", value:formData?.size},
        {label:"Plot Rate", type:"number", name:"rate", value:formData?.rate},
        {label:"Duration", type:"number", name:"duration", value:formData?.duration},
        {label:"Down Payment", type:"number", name:"downPayment", value:formData?.downPayment}
    ];
    const changeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const createNewPlot = async() => {
        try {            
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/plot/new`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({site_name:name, plot_no:formData?.plot_no, size:formData?.size, rate:formData?.rate, duration:formData?.duration, downPayment:formData?.downPayment})
            });
    
            const data = await res.json();
    
            console.log("--------- createNewPlot AddPlot");
            console.log(data);
            console.log("--------- createNewPlot AddPlot");
            
            if (data.success) {
                toast.success(data.message,{
                    duration:1000,
                    position:"bottom-center"
                });
            }
            else{
                toast.error(data.message,{
                    duration:1000,
                    position:"bottom-center"
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Error Occured",{
                duration:1000,
                position:"bottom-center"
            });
        }        
        
    }
    return(
        <AddPlotBackground>
            <Toaster />
            <main className="addplot_page_main">
                <TopButtons firstBtn={BiLeftArrowAlt} firstBtnOnClick={() => navigate(-1)} />
                <Form formHeading="Add New Plot" formFields={formFields} onClickFunc={createNewPlot} onChangeFunc={changeHandler} />
            </main>
        </AddPlotBackground>
    )
}

export default AddPlot;

const AddPlotBackground = styled.section`
// border:2px solid red;
box-sizing:border-box;
// display:grid;
// grid-template-columns:20% 80%;
height:100vh;


    .add_plot_page_main{
        background:#f4f4f4;
    }

    img{
        width:200px;
    }


// @media screen and (width <= 600px){
// grid-template-columns:100%;
// z-index:4;
// }
`;