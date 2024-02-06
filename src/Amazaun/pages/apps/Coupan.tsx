import styled from "styled-components";
import SideBar from "../../components/AdminSideBar";
import { ChangeEvent, MouseEvent, useState } from "react";
import HomePage from "../../HomePage";


const allLetters = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
const allNumbers = "0123456789";
const allSymbols = "!@#$%^(){}[]?/&*_+-<>";

const Coupan = () => {
    //05:57:00
    const [prefix, setPrefix] = useState<string>("");
    const [size, setSize] = useState<number>(8);
    const [isContainNum, setIsContainNum] = useState<boolean>(false);
    const [isContainChar, setIsContainChar] = useState<boolean>(false);
    const [isContainSymbol, setIsContainSymbol] = useState<boolean>(false);
    const [previewCoupan, setPreviewCoupan] = useState<string>("");
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [copiedText, setCopiedText] = useState<string>("null");


    const generateCoupanHandler = (e:MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // if (!isContainNum && !isContainChar && !isContainSymbol){
        //     return alert("Please select one at least");       
        // }
        let result:string = prefix || "";
        const loopLength:number = size - result.length;
        for (let i = 0; i < loopLength; i++) {
            let entireString:string = "";
            if (isContainChar) entireString += allLetters;
            if (isContainNum) entireString += allNumbers;
            if (isContainSymbol) entireString += allSymbols;
                
            const randomNum:number = ~~(Math.random() * entireString.length);
            result += entireString[randomNum];
        }
        setPreviewCoupan(result);
    };


    return(
        <CoupanBackground>
            <SideBar />
            <HomePage />
            <main className="coupan_main">
                <section>
                    <h1>Coupan</h1>
                    <form className="coupan_form">
                        <input className="inpp" type="text" placeholder="Text to include" onChange={(e:ChangeEvent<HTMLInputElement>) => setPrefix(e.target.value)} />
                        <input type="number" placeholder="Length" onChange={(e:ChangeEvent<HTMLInputElement>) => setSize(Number(e.target.value))} />
                        <div className="checkboxes">
                            <input type="checkbox" name="" id="" onChange={(e:ChangeEvent<HTMLInputElement>) => setIsContainNum(!isContainNum)} /><label>Numbers</label>
                            <input type="checkbox" name="" id="" onChange={(e:ChangeEvent<HTMLInputElement>) => setIsContainChar(!isContainChar)} /><label>Characters</label>
                            <input type="checkbox" name="" id="" onChange={(e:ChangeEvent<HTMLInputElement>) => setIsContainSymbol(!isContainSymbol)} /><label>Symbols</label>
                        </div>
                        <button onClick={generateCoupanHandler}>Generate</button>
                        <div className="preview_coupan" onClick={() => setCopiedText(previewCoupan)}>{previewCoupan}</div>
                        <div className="preview_coupan">{copiedText}</div>
                    </form>
                </section>
            </main>
        </CoupanBackground>
    )
}

export default Coupan;

const CoupanBackground = styled.section`
// border:2px solid red;
display:grid;
grid-template-columns:20% 80%;
// height:100%;
// margin:0;
// height:100vh;
    .coupan_main{
        // border:2px solid green;
        display:flex;
        background:rgb(244, 244, 244);
        // height:100vh;
        flex-wrap:wrap;
        width:100%;
    }
        .coupan_main section{
            // border:2px solid indigo;
            background:white;
            border-radius:1rem;
            padding:1rem;
            // width:70%;
            margin:40px auto 20px auto;
        }
            .coupan_main h1{
                // border:2px solid violet;
                text-align:center;
                background:white;
                // border-radius:1rem 1rem 0 0;
                // width:70%;
            }
            .coupan_main section form{
                // border:2px solid blue;
                display:grid;
                grid-template-columns:78% 18%;
                grid-auto-rows:2.5rem;
                grid-gap:1rem;
            }
                .coupan_main section form input{
                    padding: 0 1rem;
                    border: 1px solid #CBD5E0;
                    border-radius: 0.375rem;
                    font-size: 1rem;
                    outline: none;
                    transition: border-color 0.2s;
                    // width:100%;
                }
                .coupan_main section form input:hover{
                    border:1px solid rgb(192, 197, 202);
                }
                .coupan_main section form input:focus{
                    outline:1.8px solid #3182CE;
                    border-radius:5px;
                }
                .coupan_main section form .checkboxes{
                    display:flex;
                    // border:2px solid yellow;
                    grid-column:1/-1;
                    justify-content:space-around;
                    align-items:center;
                }
                    // .coupan_main section form .checkboxes input{
                        // border:2px solid orange;
                        // margin-left:10%;
                    // }
                    // .coupan_main section form .checkboxes label{
                        // border:2px solid orange;
                    //     font-size:0.7rem;
                    // }
                .coupan_main section form button{
                    // border:2px solid red;
                    // background:#CBD5E0;
                    background:#3182CE;
                    padding:0.2rem 0.6rem;
                    color:white;
                    grid-column:1/-1;
                }
                .coupan_main section form .preview_coupan{
                    // border:2px solid black;
                    grid-column:1/-1;
                    text-align:center;
                }

@media screen and (width <= 600px){
grid-template-columns:100%;
// border:2px solid blue;
// z-index:2;
// height:auto;
// font-size:10px;


    .coupan_main section form{
        // border:2px solid blue;
        // display:grid;
        grid-template-columns:100%;
    }
        .coupan_main section form .checkboxes{
            flex-wrap:wrap;
        }
    .coupan_main section form .checkboxes label{
        font-size:0.7rem;
    }
}
`;