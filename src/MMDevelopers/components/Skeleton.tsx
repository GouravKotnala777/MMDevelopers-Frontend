import styled from "styled-components";


const Skeleton = ({height, width, padding, animation}:{height:number, width:number, padding?:number|0, animation?:string}) => {

    return(
        <SkeletonBackground style={{padding:`${padding}px`}}>
            <div className="line" style={{height:`${height}px`, width:`${width}%`, animation:animation}}></div>
        </SkeletonBackground>
    )
};

export default Skeleton;

const SkeletonBackground = styled.section`
// border:2px solid red;

    .line{
        // border:2px solid green;
        // background:#f4f4f4;
        background:gray;
    }


@keyframes loading {
    0%{opacity:0.4;}
    50%{opacity:1;}
    100%{opacity:0.4;}
}
`;