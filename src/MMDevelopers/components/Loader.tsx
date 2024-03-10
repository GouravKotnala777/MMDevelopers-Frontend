import styled from "styled-components";


const Loader = ({width, color, borderWidth, hasHeading}:{width?:number; color?:string; borderWidth?:number; hasHeading?:boolean;}) => {

    return(
                
        <LoaderBackground>
            <div className="container">
                <div className="loader-container">
                <div className="loader">
                    <div className="spinner"></div>
                    <h2>Loading...</h2>
                </div>
                </div>
            </div>
        </LoaderBackground>
    )
};

export default Loader;

const LoaderBackground = styled.section`
border:2px solid red;


.container {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .loader-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    z-index: 1;
  }
  
  .loader {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .spinner {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: loadingAmination 1s linear infinite;
    margin-bottom: 10px;
  }

  h2 {
    margin: 0;
    animation: loadingHeading 1s ease-in-out infinite;
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