import { FC } from "react";
import SideBar from "../components/AdminSideBar";
import styled from "styled-components";
import { LineChart } from "../components/Charts";
import HomePage from "../HomePage";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];

const LineChartPage:FC = () => {
    
    return(
        <LineChartPageBackground>
            <SideBar />
            <HomePage />
            <main className="line_chart_main">
                <h1 className="line_chart_h1">Line Charts</h1>

                <section className="line_chart_section1">
                    <div className="charts">
                        <LineChart data={[200, 444, 343, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200]} label="Users" borderColor="rgb(53, 162, 255)" backgroundColor="rgb(53, 162, 255, 0.5)" labels={months} />
                    </div>
                    <h2>ACTIVE USERS</h2>
                </section>

                <section className="line_chart_section2">
                    <div className="charts">
                        <LineChart data={[200, 444, 343, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200]} label="Products" borderColor="rgb(53, 162, 255)" backgroundColor="rgb(53, 162, 255, 0.5)" labels={months} />
                    </div>
                    <h2>TOTAL PRODUCTS</h2>
                </section>

                <section className="line_chart_section2">
                    <div className="charts">
                        <LineChart data={[200, 444, 343, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200]} label="Revenue" borderColor="rgb(53, 162, 255)" backgroundColor="rgb(53, 162, 255, 0.5)" labels={months} />
                    </div>
                    <h2>TOTAL REVENUE</h2>
                </section>

                <section className="line_chart_section2">
                    <div className="charts">
                        <LineChart data={[200, 444, 343, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200]} label="Discount" borderColor="rgb(53, 162, 255)" backgroundColor="rgb(53, 162, 255, 0.5)" labels={months} />
                    </div>
                    <h2>DISCOUNT ALLOTED</h2>
                </section>

            </main>
        </LineChartPageBackground>
    )
}

export default LineChartPage;

const LineChartPageBackground = styled.section`
border:2px solid red;
display:grid;
grid-template-columns:20% 80%;
height:91vh;
    .line_chart_main{
        border:2px solid green;
        // height:10rem;
        background:rgb(240, 240, 240);
        // padding:2rem;
        overflow:scroll;
    }
    .line_chart_h1{
        border:2px solid green;
        font-size:1.2rem;
        font-weight:bold;
        padding:0.5rem 0 0 2rem;
    }
    .line_chart_section1{
        background:white;
        margin:1rem 2rem 1rem 2rem;
    }
        .line_chart_section1 .charts{
            padding:2rem;
        }
        .line_chart_section1 h2{
            padding:0 0 1rem 2rem;
        }
    .line_chart_section2{
        background:white;
        margin:1rem 2rem 1rem 2rem;
    }
        .line_chart_section2 .charts{
            padding:2rem;
        }
        .line_chart_section2 h2{
            padding:0 0 1rem 2rem;
        }

@media screen and (width <= 600px){
grid-template-columns:100%;
// z-index:2;
} 
`;