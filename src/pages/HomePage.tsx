import React, { useEffect } from "react";
import ProtectedLayout from "../layout/ProtectedLayout";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../components/header/AuthHeader";
import { useAppSelector } from "../store/hooks";
import { selectCurrentToken } from "../store/slices/authSlice";

const HomePage = () => {
    const token = useAppSelector(selectCurrentToken);
    const navigate = useNavigate();

    console.log({ token });

    useEffect(() => {
        if (!token) {
            navigate("/login");
        } else {
            navigate("/dashboard");
        }
    }, []);

    return <div></div>;
};

export default HomePage;
