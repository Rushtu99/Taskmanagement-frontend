import React from "react";
import { useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router";

export const EmailVerification = () => {
    let navigate = useNavigate();
    useEffect(()=>{
        callVerify();
    },[])

    let callVerify = async()=>{
        await api.verifyEmail();
        navigate("/Dashboard", { replace: true });
    }

  return <div>EmailVerification</div>;
};
