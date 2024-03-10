import styled from "styled-components";


const MiniLoader = ({width, borderWidth, color}:{width?:number, borderWidth?:number; color?:string;}) => {

    return(                
        <MiniLoaderBackground>
          <div className="spinner_container">
              <div className="spinner" style={{width:`${width}px`, height:`${width}px`, border:`${borderWidth}px solid #f3f3f3`, borderTop:color ? `${borderWidth}px solid ${color}` : `${borderWidth}px solid #3498db`}}></div>
          </div>
        </MiniLoaderBackground>
    )
};

export default MiniLoader;

const MiniLoaderBackground = styled.section`
// border:2px solid red;
position:relative;
  
  .spinner_container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .spinner {
    border-radius: 50%;
    animation: loadingAmination 1s linear infinite;
    // margin-bottom: 10px;
  }
    
    @keyframes loadingAmination {
        0%{transform:rotate(0deg);}
        100%{transform:rotate(360deg);}
    }
    @keyframes loadingHeading {
        0%{opacity:0.1}
        50%{opacity:1}
        100%{opacity:0.1}
    }
`;