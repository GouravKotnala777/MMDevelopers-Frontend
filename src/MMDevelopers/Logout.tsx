import styled from "styled-components";
import toast, {Toaster} from "react-hot-toast";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Logout = () => {
    const [checkBoxValue, setCheckBoxValue] = useState<boolean>(false);
    const navigate = useNavigate();

    const logoutHandler = async() => {
        try {
            if (checkBoxValue) {
                await signOut(auth);
    
                toast.success("Logout Successful", {
                    position:"bottom-center",
                    duration:2000,
                });
                
                setTimeout(() => {
                    navigate("/");
                }, 2300);
            }
            else{
                toast.error("Please Check Confirmation", {
                    position:"bottom-center",
                    duration:2000,
                });
            }
            
        } catch (error) {
            toast.error("Error Occured", {
                position:"bottom-center",
                duration:2000,
            });
            
        }
    }

    return(
        <LogoutBackground>
            <Toaster />
            <div className="logout_cont">
                <h3>Do you want to Logout!</h3>
                <input type="checkbox" onChange={() => setCheckBoxValue(!checkBoxValue)} />
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </LogoutBackground>
    )
};

export default Logout;

const LogoutBackground = styled.section`
border:2px solid red;
padding:10px;

    .logout_cont{
        // border:2px solid violet;
        border-radius:8px;
        margin:30px auto;
        box-shadow:0 8px 16px rgba(0,0,0,0.1);
        display:flex;
        flex-direction:column;
        padding:10px;
        align-items:center;
        max-width:300px;
    }
    .logout_cont h3{
        // border:2px solid violet;

    }
    .logout_cont input{
        // border:2px solid violet;
        margin-left:10px;
        margin-right:auto;
    }
    .logout_cont button{
        // border:2px solid violet;
        margin:20px 0;
        padding:10px;
        width:100%;
        border-radius:4px;
        border:none;
        background:#3182ce;
        color:white;
        font-weight:bold;
    }
    .logout_cont button:hover{
        background:#4e95d8;
    }
`;