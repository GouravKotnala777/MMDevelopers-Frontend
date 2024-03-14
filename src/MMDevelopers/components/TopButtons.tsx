import { FC, MouseEventHandler } from "react";
import { IconType } from "react-icons";
import { BiGrid, BiGridAlt } from "react-icons/bi";
import { RiGridFill } from "react-icons/ri";
import styled from "styled-components";

interface TopButtonsPropTypes {
    firstBtn?:IconType;
    lastBtn?:IconType;
    firstBtnOnClick?:MouseEventHandler;
    lastBtnOnClick?:MouseEventHandler;
    otherBtns?:IconType[];
    otherBtnsOnClick?:MouseEventHandler[];
};

const TopButtons:FC<TopButtonsPropTypes> = ({firstBtn:FirstBtn, lastBtn:LastBtn, otherBtns, otherBtnsOnClick, firstBtnOnClick, lastBtnOnClick}) => {

    return(
        <TopButtonsBackground>
            <section className="back_and_other_btns">
                {
                    FirstBtn && <FirstBtn className="first_btn all_btns" onClick={firstBtnOnClick}/>
                }
                <div className="other_btns">
                    {
                        otherBtns && otherBtns.map((Btn, index) => (
                                    <Btn key={index} className="all_btns" onClick={otherBtnsOnClick && otherBtnsOnClick[index]} />
                                    ))
                    }
                </div>
                {
                    LastBtn && <LastBtn className="last_btn all_btns" onClick={lastBtnOnClick}/>
                }
            </section>
        </TopButtonsBackground>
    )
};

export default TopButtons;

const TopButtonsBackground = styled.section`
// border:2px solid red;
width:100%;

    .back_and_other_btns{
        // border:2px solid violet;
        display:flex;
        // justify-content:space-between;
        
        // padding:0 8px;
        font-size:20px;
        
    }
        .back_and_other_btns .first_btn{
            // border:2px solid blue;
            // padding:4px;
        }
        .back_and_other_btns .other_btns{
            // border:2px solid violet;
            display:flex;
            margin-left:auto;
        }
        .back_and_other_btns .last_btn{
            // border:2px solid green;
        }
        .back_and_other_btns .all_btns{
            // background:gainsboro;
            color:#ff763b;
            // background:white;
            cursor:pointer;
            margin:8px;
            border:1px solid #ff763b;
        }
        .back_and_other_btns .all_btns:hover{
            background:#f4f4f4;
        }


`;