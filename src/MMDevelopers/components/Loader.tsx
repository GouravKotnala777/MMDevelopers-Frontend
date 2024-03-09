import styled from "styled-components";


const Loader = ({width, color, borderWidth, hasHeading}:{width?:number; color?:string; borderWidth?:number; hasHeading?:boolean;}) => {

    return(
        <LoaderBackground>
            <div className="upper_circle" style={{width:`${width || 120}px`, height:`${width || 120}px`, borderLeft:borderWidth ? `${borderWidth}px solid ${color}` : `8px solid gray`, borderRight:borderWidth ? `${borderWidth}px solid ${color}` : `8px solid gray`}}>
            </div>
            {
                hasHeading ?
                    <div className="loader_heading">
                    </div>
                    :
                    <div className="loader_heading">
                        Loading...
                    </div>
            }
        </LoaderBackground>
    )
};

export default Loader;

const LoaderBackground = styled.section`
// border:2px solid red;
// position:relative;

    .upper_circle{
        border-top:8px solid white;
        border-bottom:8px solid white;
        margin:100px auto;
        border-radius:50%;
        animation:loadingAmination 1s linear infinite;
        position:relative;
    }
    .loader_heading{
        // border:2px solid green;
        position:absolute;
        top:38%;
        left:auto;
        margin:0 auto;
        font-weight:bold;
        width:100%;
        text-align:center;
        animation:loadingHeading 1s ease-in-out infinite;
    }

    
    @keyframes loadingAmination {
        0%{transform:rotate(0deg);}
        100%{transform:rotate(360deg);}
    }
    @keyframes loadingHeading {
        0%{opacity:0.2}
        50%{opacity:1}
        100%{opacity:0.2}
    }
`;