import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

interface ProtectedRouteProps {
    children:ReactElement;
    isAuthenticated:boolean;
    adminRoute?:boolean;
    isAdmin?:boolean;
    redirect?:string;
};

const ProtectedRoute = ({isAuthenticated, children, adminRoute, isAdmin, redirect = "/"}:ProtectedRouteProps) => {
    if (!isAuthenticated) return <Navigate to={redirect} />;


    return children;
};

export default ProtectedRoute;

const ProtectedRouteBackground = styled.section`
border:2px solid red;
`;