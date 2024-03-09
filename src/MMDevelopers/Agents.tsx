import { BiArrowBack } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopButtons from "./components/TopButtons";


interface OldPlot {
    plot_no: number;
    size: number;
    rate: number;
    duration: number;
    downPayment: number;
    hasSold: boolean;
    agent: string;
    pendings: number;
    paid: number;
  }
  
  interface OldSite {
    site_name: string;
    plots: OldPlot[];
  }
  
  type OldDataType = OldSite[];
  
  interface TransformedAgentData {
    pendings: number;
    soldPlots: number;
  }
  
  interface TransformedSiteData {
    [agent: string]: TransformedAgentData;
  }
  
  interface TransformedDataTypeNew {
    [site: string]: TransformedSiteData;
  }


const Agents = () => {
    const transformedData:TransformedDataTypeNew = useLocation().state;
    const siteNamekeysArray = Object.keys(transformedData);
    const navigate = useNavigate();
    
    let agentNameArrayWithDuplicates:string[][] = siteNamekeysArray.map((i) => {
        return [...Object.keys(transformedData[i])]
    });

    let agentNamekeysArray = Array.from(new Set(agentNameArrayWithDuplicates.flat()));
    // console.log(agentNameArrayUnique);
    console.log(transformedData);


    return(
        <AgentsBackground>
            <TopButtons firstBtn={BiArrowBack} firstBtnOnClick={() => navigate(-1)} />
            <section className="back_and_nav_btns">
            </section>
            {/* <pre>{JSON.stringify(transformedData, null, `\t`)}</pre> */}
            <div className="agent_cont">
                {
                    siteNamekeysArray.map((site_name, index) => (
                        <div className="sellings_cont" key={index}>
                            <div className="site_name">
                                {site_name}
                            </div>

                            {
                                agentNamekeysArray.map((agent_name) => (
                                    transformedData[site_name][agent_name] &&
                                        <div className="sellings_detailes_cont">
                                            <div className="agent_name">{(agent_name)}</div>
                                            <div className="heading">Sold Area</div>
                                            <div className="value">{transformedData[site_name][agent_name].soldPlots}</div>
                                            <div className="heading">Pendings</div>
                                            <div className="value">{transformedData[site_name][agent_name].pendings}</div>
                                        </div>
                                ))
                            }

                        </div>
                    ))
                }
            </div>
        </AgentsBackground>
    )
};

export default Agents;

const AgentsBackground = styled.section`
// border:2px solid red;

    .agent_cont{
        // border:2px solid pink;
    };
        .sellings_cont{
            // border:2px solid violet;
            width:250px;
            margin:20px auto;
            background:#ff763b;
            border-radius:8px;
            padding:4px;            
        };
            .sellings_cont .site_name{
                // border:2px solid indigo;
                text-align:center;
                color:white;
                font-weight:bold;
            };
            .sellings_cont .sellings_detailes_cont{
                // border:2px solid blue;
                display:grid;
                grid-template-columns:50% 50%;
                padding:4px;
                margin:4px;
                background:#f4f4f4;
                border-radius:4px;
                box-shadow: inset 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
            };
                .sellings_cont .sellings_detailes_cont .agent_name{
                    // border:2px solid violet;
                    grid-column:1/-1;
                    text-align:center;
                    font-size:13px;
                    padding:4px 0;
                };
                .sellings_cont .sellings_detailes_cont .heading{
                    // border:2px solid black;
                    background:white;
                    font-size:13px;
                    padding:4px;
                };
                .sellings_cont .sellings_detailes_cont .value{
                    // border:2px solid black;
                    background:white;
                    font-size:13px;
                    padding:4px;
                };

`;