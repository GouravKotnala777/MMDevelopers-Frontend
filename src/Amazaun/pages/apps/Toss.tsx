import styled from "styled-components";
import SideBar from "../../components/AdminSideBar";

const Toss = () => {

    return(
        <TossBackground>
            <SideBar />
            <main className="toss_main">
                Toss                
            </main>
        </TossBackground>
    )
}

export default Toss;

const TossBackground = styled.section`
border:2px solid red;
display:grid;
grid-template-columns:20% 80%;
height:91vh;
    .toss_main{
        border:2px solid green;
        background:rgb(240, 240, 240);
        overflow:scroll;
    }
`;