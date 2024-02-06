import { FC } from "react";
import SideBar from "../components/AdminSideBar";
import styled from "styled-components";
import {PieChart, DoughnutChart} from "../components/Charts";
import HomePage from "../HomePage";

const PieChartPage:FC = () => {
    
    return(
        <PieChartPageBackground>
            <SideBar />
            <HomePage />
            <main className="pie_chart_main">
                <h1 className="pie_chart_h1">Pie & Dougnut Charts</h1>

                <section className="pie_chart_section1">
                    <div className="charts">
                        <PieChart labels={["Processing", "Shipped", "Delivered"]} data={[12, 9, 13]} backgroundColor={[`hsl(110, 80%, 80%)`, `hsl(110, 80%, 50%)`, `hsl(110, 40%, 50%)`]} offset={[0 , 0, 50]} />
                    </div>
                    <h2>TOP SELLING PRODUCTS & TOP CUSTOMERS</h2>
                </section>

                <section className="pie_chart_section2">
                    <div className="charts">
                        <DoughnutChart labels={["Processing", "Shipped", "Delivered"]} data={[12, 9, 13]} backgroundColor={[`hsl(110, 80%, 80%)`, `hsl(110, 80%, 50%)`, `hsl(110, 40%, 50%)`]} offset={[0 , 0, 50]} />
                    </div>
                    <h2>PRODUCT CATEGORIES RATIO</h2>
                </section>
                
                <section className="pie_chart_section2">
                    <div className="charts">
                        <DoughnutChart labels={["In Stock", "Out Of Stock"]} data={[40, 20]} backgroundColor={[`hsl(269, 80%, 40%)`, `rgb(53, 162, 255)`]} offset={[0 , 80]} legends={false} cutout={"70%"}/>
                    </div>
                    <h2>STOCK AVAILABILITY</h2>
                </section>

                <section className="pie_chart_section2">
                    <div className="charts">
                        <DoughnutChart labels={["Marketing Cost", "Discount", "Burnt", "Production Cost", "Net Margin"]} data={[32, 18, 5, 20, 25]} backgroundColor={[`hsl(110, 80%, 40%)`, `hsl(19, 80%, 40%)`, `hsl(69, 80%, 40%)`, `hsl(300, 80%, 40%)`, `rgb(53, 162, 255)`]} offset={[20, 30, 20, 30, 80]} legends={false} />
                    </div>
                    <h2>REVENUE DISTRIBUTION</h2>
                </section>

                <section className="pie_chart_section2">
                    <div className="charts">
                        <PieChart labels={["Teenager", "Adult", "Older"]} data={[30, 250, 70]} backgroundColor={[`hsl(10, ${80}%, 80%)`, `hsl(10, ${80}%, 50%)`, `hsl(10, ${40}%, 50%)`]} offset={[0, 0, 50]} />
                    </div>
                    <h2>USER AGE GROUP</h2>
                </section>

                <section className="pie_chart_section2">
                    <div className="charts">
                        <DoughnutChart labels={["Admin", "Customer"]} data={[40, 250]} backgroundColor={[`hsl(335, ${100}%, 38%)`, `hsl(44, ${98}%, 50%)`]} offset={[0, 80]} cutout={"70%"} />
                    </div>
                    <h2>Users</h2>
                </section>

            </main>
        </PieChartPageBackground>
    )
}

export default PieChartPage;

const PieChartPageBackground = styled.section`
border:2px solid red;
display:grid;
grid-template-columns:20% 80%;
height:91vh;
    .pie_chart_main{
        border:2px solid green;
        // height:10rem;
        background:rgb(240, 240, 240);
        // padding:2rem;
        overflow:scroll;
    }
    .pie_chart_h1{
        // border:2px solid green;
        font-size:1.2rem;
        font-weight:bold;
        padding:0.5rem 0 0 2rem;
    }
    .pie_chart_section1{
        background:white;
        margin:1rem 2rem 1rem 2rem;
    }
        .pie_chart_section1 .charts{
            max-width:25rem;
            margin:auto;
            padding:2rem;
        }
        .pie_chart_section1 h2{
            padding:0 0 1rem 2rem;
            text-align:center;
        }
    .pie_chart_section2{
        background:white;
        margin:1rem 2rem 1rem 2rem;
        // border:2px solid violet;
    }
        .pie_chart_section2 .charts{
            max-width:25rem;
            margin:auto;
            padding:2rem;
            // border:2px solid indigo;
        }
        .pie_chart_section2 h2{
            padding:0 0 1rem 2rem;
            text-align:center;
            // border:2px solid blue;

        }

@media screen and (width <= 600px){
grid-template-columns:100%;
// z-index:2;
} 
`;