import styled from "styled-components";
import Form from "./components/Form";
import { ChangeEvent, FC, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useLoginMutation } from "../MMDevelopers/redux/api/userAPI";
import toast, {Toaster} from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse, UserResponse } from "./types/api-types";
import { FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { userExist } from "./redux/reducer/userReducer";
import TopButtons from "./components/TopButtons";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface LoginFormType {
    gender?:string;
    date?:string;
};

const Login:FC = () => {
    const [loginInp, setLoginInp] = useState<LoginFormType>();
    const navigate = useNavigate();
    // const [gender, setGender] = useState<string>("");
    // const [date, setDate] = useState<string>("");
    const dispatch = useDispatch();

    const selectOptions = [
        {label:"Male", name:"male", value:"male"},
        {label:"Female", name:"female", value:"female"}
    ];
    const formFields = [
        {label:"Gender", type:"select", name:"gender", value:loginInp?.gender},
        {label:"Date", type:"date", name:"date", value:loginInp?.date}
    ];

    const [login] = useLoginMutation();

    const changeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>) => {
        setLoginInp({...loginInp, [e.target.name]:e.target.value});
    }
    
    const postLogin = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const {user} = await signInWithPopup(auth, provider);
            const res = await login({
                name:user.displayName!,
                email:user.emailVerified,
                pic:user.photoURL!,
                gender:loginInp?.gender as string,
                role:"user",
                dob:loginInp?.date as string,
                _id:user.uid
            });
            if ("data" in res) {
                dispatch(userExist({
                    name:user.displayName!,
                    email:user.emailVerified,
                    pic:user.photoURL!,
                    gender:loginInp?.gender as string,
                    role:"user",
                    dob:loginInp?.date as string,
                    _id:user.uid
                }));
                toast.success("Login Successful", {
                    duration:2000,
                    position:"bottom-center"
                });
                setTimeout(() => {
                    navigate("/");
                }, 2300);
            }
            else{
                const error = res.error as FetchBaseQueryError;
                const message = error.data as MessageResponse;
                toast.error(message.message, {
                    duration:3000,
                    position:"bottom-center"
                });
                console.log("------ Login");
                console.log(message);
                console.log("------ Login");
            }
            console.log(user);
            
        } catch (error) {
            toast.error("Error Occured", {
                duration:3000,
                position:"bottom-center"
            });
        }
    };

    return(
        <LoginBackground>
            <Toaster />
            <TopButtons firstBtn={BiLeftArrowAlt} firstBtnOnClick={() => navigate("/")} />
            <Form formHeading="Login" formFields={formFields} onClickFunc={postLogin} onChangeFunc={changeHandler} selectOptions={selectOptions} />
            <main className="login_main">
                <p>Already Signed In Once</p>
                <button onClick={postLogin}>
                    <FaGoogle /><span>Sign in with Google</span>
                </button>
            </main>
        </LoginBackground>
    )
};

export default Login;

const LoginBackground = styled.section`
// border:2px solid red;
padding:10px;

    .login_main{
        // border:2px solid blue;
        // width:300px;
        border-radius:8px;
        margin:30px auto;
        // padding:10px;
        box-shadow:0 8px 16px rgba(0,0,0,0.1);
    }
        .login_main h1{
            // border:2px solid pink;
            text-align:center;
            font-size:18px;
            font-weight:bold;
        }
        .login_main{
            // border:2px solid green;
            display:flex;
            flex-direction:column;
            margin:20px auto;
            padding:10px;
        }
            .login_main button{
                // border:2px solid red;
                display:flex;
                align-items:center;
                justify-content:space-around;
                border:1px solid gainsboro;
                margin:5px 0;
                padding:5px;
                border-radius:4px;
            }


@media screen and (width <= 300px){
    font-size:14px;

    .login_main button{
        padding:8px;
    }
}
`;