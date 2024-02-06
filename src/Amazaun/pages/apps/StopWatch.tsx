import styled from "styled-components";
import SideBar from "../../components/AdminSideBar";

const StopWatch = () => {

    return(
        <StopWatchBackground>
            <SideBar />
            <main className="stop_watch_main">
                Stop Watch
            </main>
        </StopWatchBackground>
    )
}

export default StopWatch;

const StopWatchBackground = styled.section`
border:2px solid red;
display:grid;
grid-template-columns:20% 80%;
height:91vh;
    .stop_watch_main{
        border:2px solid green;
        background:rgb(240, 240, 240);
        overflow:scroll;
    }
`;