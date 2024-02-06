import { FC } from "react";
import SideBar from "../components/AdminSideBar";
import styled from "styled-components";
import { BarChart } from "../components/Charts";
import HomePage from "../HomePage";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

const BarChartPage:FC = () => {
    
    return(
        <BarChartPageBackground>
            <SideBar />
            <HomePage />
            <main className="bar_chart_main">
                <h1 className="bar_chart_h1">Bar Charts</h1>
                <section className="bar_chart_section1">
                    <div className="charts">
                        <BarChart data1={[200, 444, 343, 556, 778, 455, 990]} data2={[300, 144, 433, 655, 237, 755, 190]} title1="Products" title2="Users" bgColor1={`hsl(260, 50%, 30%)`} bgColor2={`hsl(360, 90%, 90%)`} />
                    </div>
                    <h2>TOP SELLING PRODUCTS & TOP CUSTOMERS</h2>
                </section>
                <section className="bar_chart_section2">
                    <div className="charts">
                        <BarChart horizontal={true} data1={[200, 444, 343, 556, 778, 455, 990, 453, 365, 643, 285, 798]} data2={[]} title1="Products" title2="" bgColor1={`hsl(180, 40%, 50%)`} bgColor2="" labels={months} />
                    </div>
                    <h2>ORDERS THROUGHOUT THE YEAR</h2>
                </section>
            </main>
        </BarChartPageBackground>
    )
}

export default BarChartPage;

const BarChartPageBackground = styled.section`
border:2px solid red;
display:grid;
grid-template-columns:20% 80%;
height:91vh;
    .bar_chart_main{
        border:2px solid green;
        background:rgb(240, 240, 240);
        overflow:scroll;
    }
    .bar_chart_h1{
        border:2px solid green;
        font-size:1.2rem;
        font-weight:bold;
        padding:0.5rem 0 0 2rem;
    }
    .bar_chart_section1{
        background:white;
        margin:1rem 2rem 1rem 2rem;
    }
        .bar_chart_section1 .charts{
            padding:2rem;
        }
        .bar_chart_section1 h2{
            padding:0 0 1rem 2rem;
        }
    .bar_chart_section2{
        background:white;
        margin:1rem 2rem 1rem 2rem;
    }
        .bar_chart_section2 .charts{
            padding:2rem;
        }
        .bar_chart_section2 h2{
            padding:0 0 1rem 2rem;
        }

@media screen and (width <= 600px){
grid-template-columns:100%;
// z-index:2;
} 
`;