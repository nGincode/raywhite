
import '../css/globals.css'

import React, { Component, useEffect, useState, Suspense } from "react"
import Script from "next/script";
import type { AppProps } from 'next/app'
import toast, { Toaster } from 'react-hot-toast';
import _ from "lodash";
import axios from "axios";

import Layout from './components/layout'
import Login from "./auth/login"
import LoadingPage from './components/loadingPage';
import Skelaton from './components/skelaton';

export default function App({ Component, pageProps }: AppProps) {
    const [userData, setuserData] = useState<any>([]);
    const [loadingFull, setloadingFull] = useState<any>(true);
    const [pageActive, setpageActive] = useState<any>(true);
    const [loadSkel, setloadSkel] = useState(true);


    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('client_id');
        setuserData(undefined);
    }

    const handleApi = async (url: any, data: any = null) => {
        if (url === 'login') {
            try {
                await axios({
                    method: "POST",
                    url: "/api/login",
                    data: data,
                }).then((res) => {
                    if (res.data.status === 404) {
                        toast.error(res.data.message)
                    }
                    if (res.data.status == 200) {
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('client_id', res.data.client_id);
                        setuserData(res.data.data);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        } else if (url === 'user') {
            setloadingFull(true);
            try {
                await axios({
                    method: "GET",
                    url: "/api/user/" + localStorage.getItem("client_id"),
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }).then((res) => {
                    setuserData(res.data.data);
                    setloadingFull(false);
                });
            } catch (error: any) {
                if (localStorage.getItem('token'))
                    toast.error(error.response.data.massage);
                setloadingFull(false);
            }
        }
    }

    const submitLogin = (event: any) => {
        event.preventDefault();
        let data = {
            email: event.target.email.value,
            password: event.target.password.value
        };

        handleApi('login', data);
    };

    useEffect(() => {
        handleApi('user');
    }, []);


    return (
        <>
            <Toaster />
            <LoadingPage process={loadingFull} />
            <Script
                src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
            />
            <Script
                src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"
            />
            {userData?.email ?
                <Layout logOut={logOut} userData={userData} pageActive={pageActive} >
                    {loadSkel && <Skelaton />}
                    <Component userData={userData} setuserData={setuserData} pageActive={setpageActive} setloadSkel={setloadSkel}  {...pageProps} />
                </Layout> :
                <Login submitLogin={submitLogin} />}
        </>)

}