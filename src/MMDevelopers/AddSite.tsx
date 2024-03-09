import {ChangeEvent, useState} from "react";
import styled from "styled-components";
import Form from "./components/Form";
import { useNavigate, useParams } from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import { AddSiteState } from "./types/types";
import TopButtons from "./components/TopButtons";
import { BiLeftArrowAlt } from "react-icons/bi";





const AddSite = () => {
    const {siteID} = useParams();
    const [formData, setFormData] = useState<AddSiteState>();
    const navigate = useNavigate();
    
    const formFields = [
        {label:"Site Name", type:"text", name:"site_name", value:formData?.site_name},
        {label:"Total Size", type:"number", name:"total_size", value:formData?.total_size}
    ];
    const changeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const createNewSite = async() => {
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/site/new`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({site_name:formData?.site_name, total_size:formData?.total_size})
            });
    
            const data = await res.json();
    
            console.log("--------- createNewPlot AddSite");
            console.log(data);
            console.log("--------- createNewPlot AddSite");

            if (data.success) {
                toast.success("Site Created", {
                    duration: 1000,
                    position: "bottom-center"
                });
                setTimeout(() => {
                    navigate("/");
                }, 1400);
            }
            else{
                toast.error("Error Occured", {
                    duration:1000,
                    position:"bottom-center"
                });
            }
        } catch (error) {
            console.log(error);
            toast("Error Occured",{
                duration:1000,
                position:"bottom-center"
            });
        }
        
    }
    const updateSite = async() => {
        let siteUpdateConfirmation:boolean = window.confirm("Do you want to update this Site!")
        try {
            if (siteUpdateConfirmation) {
                const res = await fetch(`${process.env.REACT_APP_SERVER}/api/v1/site/${siteID}`, {
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({site_name:formData?.site_name, total_size:formData?.total_size})
                });

                const data = await res.json();

                console.log("--------- updateSite AddSite");
                console.log(data);
                console.log("--------- updateSite AddSite");

                if (data.success) {
                    toast.success(data.message, {
                        duration:3000,
                        position:"bottom-center"
                    })
                    navigate("/");
                }
                else{
                    toast.error(data.message, {
                        duration:3000,
                        position:"bottom-center"
                    })
                }
            }
        } catch (error) {
            toast.error("Error Occured", {
                duration:3000,
                position:"bottom-center"
            })
        }
    }

    return(
        <AddSiteBackground>
            <main className="add_site_page_main">
            <TopButtons firstBtn={BiLeftArrowAlt} firstBtnOnClick={() => {navigate(-1)}} />
                <Toaster />
                <Form formHeading={siteID === "new" ? "Add New Site" : "Update Site"} formFields={formFields} onClickFunc={siteID === "new" ? createNewSite : updateSite} onChangeFunc={changeHandler} />
            </main>
        </AddSiteBackground>
    )
}

export default AddSite;

const AddSiteBackground = styled.section`
border:2px solid red;
box-sizing:border-box;
// display:grid;
// grid-template-columns:20% 80%;
height:100vh;

    .add_site_page_main{
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