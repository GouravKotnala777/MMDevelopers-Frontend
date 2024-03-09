import {ChangeEvent, FC, MouseEvent, MouseEventHandler, useState} from "react";
import styled from "styled-components";


interface SelectOptionsTypes {
    value:string|number;
    label:string;
};
interface FormFieldsTypes {
    label:string;
    type:string;
    name?:string;
    value:string|number|undefined;
    selectOptions?:SelectOptionsTypes[];
    onChangeFunc?: (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => void;
};

interface FormProps {
    formHeading:string;
    formFields:{label:string; type:string; name:string; value:string|number|undefined}[];
    selectOptions?:SelectOptionsTypes[];
    onClickFunc?: (e:MouseEvent<HTMLButtonElement>) => Promise<void>|void;
    onChangeFunc?: (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => void;
};

interface NewPlotForm {
    site_name:string;
    plot_no:number;
    size:number;
    rate:number;
};




const Form:FC<FormProps> = ({formHeading, formFields, selectOptions, onClickFunc, onChangeFunc}) => {
    // const [formData, setFormData] = useState<NewPlotForm>({
    //     site_name:"Sec-58",
    //     plot_no:25,
    //     size:50,
    //     rate:11000
    // });
    const handleSubmit = async(e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        (onClickFunc && await onClickFunc(e));
    };
    
    
    return(
        <FormBackground>
            <h3 className="form_page_heading">{formHeading}</h3>
            <form className="form_page_form">
                {
                    formFields.map((item, index) => (
                        <LabelInput key={index} label={item.label} type={item.type} name={item?.name} value={item.value} selectOptions={selectOptions} onChangeFunc={onChangeFunc}/>
                    ))
                }
                <button className="form_btn" onClick={handleSubmit}>Submit</button>
            </form>
        </FormBackground>
    )
};






export const LabelInput:FC<FormFieldsTypes> = ({label, type, name, value, selectOptions, onChangeFunc}) =>{
    const handleChange = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        (onChangeFunc && onChangeFunc(e));
        // setFormData({...formData, [e.target.name]:e.target.value});
    };

    return(
        <>
            {
                type === "select" ?
                    <select className="form_inp" name={name} value={value} onChange={handleChange} >
                        <option value="">Select</option>
                        {
                            selectOptions?.map((option, optionIndex) => {
                                return <option key={optionIndex} value={option.value}>{option.label}</option>
                            })
                        }
                    </select>
                    :
                    <input type={type} name={name} value={value} className="form_inp" placeholder={label} onChange={handleChange} />
            }
        </>
    )
}

export default Form;

const FormBackground = styled.section`
// border:2px solid red;
max-width:350px;
margin:10px auto;
// padding:10px;
background:white;
height:max-content;
border-radius:8px;
box-shadow:0px 4px 16px rgba(0,0,0,0.1);



    .form_page_heading{
        text-align:center;
    }
    .form_page_form{
        // border:2px solid green;
        // background:#f4f4f4;
        display:flex;
        flex-direction:column;
        // padding:10px;
        // margin:10px;
    }
        .form_page_form .form_label{
            margin:3px 3px 0px 3px;
            padding:10px;
            border:none;
        }
        .form_page_form .form_inp{
            padding:10px;
            margin:10px 3px 3px 3px;
            border: 1px solid #CBD5E0;
            border-radius: 4px;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.2s;
        }
        .form_page_form .form_inp:focus{
            outline:1.8px solid #3182CE;
            border-radius:5px;
        }
        .form_page_form .form_btn{
            margin:10px 0px 10px 3px;
            padding:10px;
            border:none;
            background:#3182ce;
            color:white;
            border-radius:4px;
        }
        .form_page_form .form_btn:focus{
            background:gainsboro;
        }



@media screen and (width <= 300px){
    .form_page_form .form_inp{
        padding:8px;
        margin:8px 3px 3px 3px;
        border-radius: 4px;
        font-size: 14px;
    }
    .form_page_form .form_btn{
        margin:8px 0px 8px 3px;
        padding:8px;
        border-radius:4px;
    }
}
`;