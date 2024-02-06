import { useToast } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FC, useState } from "react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import styled from "styled-components";
import { auth } from "../firebase";
import { useLoginMutation } from "./redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MessageResponse } from "./types/api-types";

const LoginPage:FC = () => {
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");
    const toast = useToast();

    const [login] = useLoginMutation();

    const loginHandler = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const {user} = await signInWithPopup(auth, provider);
            const res = await login({
                name:user.displayName!,
                email:user.email!,
                pic:user.photoURL!,    //01:13:00
                gender,
                role:"user",
                dob:date,
                _id:user.uid
            });

            if ("data" in res) {
                toast({
                    title:"Login Successful",
                    duration:3000,
                    status:"success",
                    position:"bottom"
                });
                console.log("------ Login");
                console.log(res);
                console.log("------ Login");
            }
            else{
                const error = res.error as FetchBaseQueryError;
                const message = error.data as MessageResponse;
                toast({
                    title:message.message,
                    duration:3000,
                    status:"error",
                    position:"bottom"
                });
                console.log("------ Login");
                console.log(message);
                console.log("------ Login");
            }
            console.log(user);
            
        } catch (error) {
            // console.log(error);
            toast({
                title:"Sing In Failed",
                duration:3000,
                status:"error",
                position:"bottom"
            });
        }

    };

    return(
        <LoginPageBackground>
            <main className="login_main">
                <h1>Login</h1>
                <div className="aass">
                    <label>Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                <div className="aass">
                    <label>Date of Birth</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
            </main>
            <main className="login_main">
                <div className="aass">
                    <p>Already Signed In Once</p>
                    <button onClick={loginHandler}>
                        <FaGoogle /><span>Sign in with Google</span>
                    </button>
                    <button onClick={loginHandler}>
                        <FaFacebookF /><span>Sign in with Facebook</span>
                    </button>
                </div>
            </main>
        </LoginPageBackground>
    )
};

export default LoginPage;

const LoginPageBackground = styled.section`
// border:2px solid red;
// width:1200px;
min-width:330px;
    .login_main{
        // border:2px solid blue;
        width:300px;
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
        .login_main .aass{
            // border:2px solid green;
            display:flex;
            flex-direction:column;
            margin:20px auto;
            padding:10px;
        }
            .login_main .aass button{
                // border:2px solid red;
                display:flex;
                align-items:center;
                justify-content:space-around;
                border:1px solid gainsboro;
                margin:5px 0;
                padding:5px;
                border-radius:4px;
            }
`;