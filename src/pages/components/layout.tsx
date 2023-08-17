/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */

import React, { Component, useEffect, useState } from "react"
import { useRouter } from 'next/router'
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";

export default function layout({ children = null, logOut, userData, pageActive }: any) {
    const router = useRouter();
    const [menu, setMenu] = useState<any>(true);
    const [hovering, sethovering] = useState<any>()
    const [isMobile, setIsMobile] = useState(false);


    const handleResize = () => {
        if (window.innerWidth < 640) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    useEffect(() => {
        (window as any).addEventListener("resize", handleResize)
    })


    const expandSidebar = (val: any) => {
        const sidebar = document.getElementById('sidebar') as HTMLElement;
        const mainContent = document.querySelector('.pl-16') as HTMLElement;
        const userInfo = document.getElementById('userInfo') as HTMLElement;

        if (val) {
            sidebar.style.width = '4rem';
            mainContent.style.paddingLeft = '4rem';
            sidebar.classList.remove('text-left');
            sidebar.classList.add('text-center');
            userInfo.classList.add('hidden');
            setMenu(true)
        } else {
            sidebar.style.width = '16rem';
            mainContent.style.paddingLeft = '16rem';
            sidebar.classList.add('text-left');
            sidebar.classList.remove('text-center');
            userInfo.classList.remove('hidden');
            setMenu(false)
        }

        const labels = sidebar.querySelectorAll('span');
        labels.forEach(label => label.classList.toggle('opacity-0'));
    }


    return (<>


        <div id="sidebar" className="w-16 text-gray-400 bg-gray-800 z-50 h-screen fixed rounded-none border-none transition-all duration-200 ease-in-out overflow-hidden">
            <div className="p-2 space-y-4">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img id="logo" className="mx-auto rounded-xl w-auto" src="data:image/png;base64,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" alt="Your Company" />
                    <div id="userInfo" className="hidden">
                        <div className=" text-xs text-left font-bold leading-9 ml-2 tracking-tight">Yoseph Duna</div>
                        <div className=" text-xs text-left -mt-4 leading-9 ml-2 tracking-tight">Author</div>
                    </div>
                </div>
                {menu ?
                    <Link onMouseEnter={() => { sethovering('/') }} onMouseLeave={() => { sethovering(false) }} className={router.asPath === '/' ?
                        "fixed hover:bg-gray-900 hover:w-60  border-l-2 w-12 bg-gray-900  px-3 py-3  flex items-center space-x-4 justify-start text-gray-500 rounded-lg group" :
                        "fixed hover:bg-gray-900 px-3 py-3  hover:w-60  flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"} href='/'>
                        <i className="fas fa-home text-lg"></i>
                        {hovering === '/' ?
                            <span className="font-medium w-60 bg-gray-900 space-x-4 text-white rounded-lg" style={{ marginLeft: "1px", padding: "14px", marginTop: "-35px", marginBottom: "-35px" }} >Dashboard</span>
                            : null}
                    </Link>
                    :
                    <Link className={router.asPath === '/' ?
                        "fixed hover:bg-gray-900 transition-all duration-200 ease-in-out  border-l-2 w-60 hover:w-60 bg-gray-900 px-3 py-3  flex items-center space-x-4 justify-start text-gray-500 rounded-lg group" :
                        "fixed hover:bg-gray-900 px-3 py-3  hover:w-60  flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"} href='/'>
                        <i className="fas fa-home text-lg"></i>
                        <span className="font-medium transition-all duration-200  text-white ">Dashboard</span>
                    </Link>}

                {menu ?
                    <Link onMouseEnter={() => { sethovering('/user') }} onMouseLeave={() => { sethovering(false) }} style={{ marginTop: '80px' }} className={router.asPath === '/user' ?
                        "fixed  border-l-2 w-12 bg-gray-900 px-3 py-3  hover:w-60  flex items-center space-x-4 justify-start text-gray-500 rounded-lg group" :
                        "fixed hover:bg-gray-900 px-3 py-3  hover:w-60  flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"} href='/user'>
                        <i className="fas fa-user text-lg"></i>
                        {hovering === '/user' ?
                            <span className="font-medium w-60 bg-gray-900 space-x-4 text-white rounded-lg" style={{ marginLeft: "1px", padding: "14px", marginTop: "-35px", marginBottom: "-35px" }} >User</span>
                            : null}
                    </Link>
                    :
                    <Link style={{ marginTop: '80px' }} className={router.asPath === '/user' ?
                        "fixed transition-all duration-200 ease-in-out  border-l-2 w-60  bg-gray-900 px-3 py-3  flex items-center space-x-4 justify-start text-gray-500 rounded-lg group" :
                        "fixed hover:bg-gray-900 px-3 py-3  hover:w-60  flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"} href="/user">
                        <i className="fas fa-user text-lg"></i>
                        <span className="font-medium w-60 transition-all duration-200  text-white">User</span>
                    </Link>}

                <div style={{ marginTop: '140px' }} className={hovering === '/news' || hovering === '/news/addNews' ?
                    router.asPath === '/news' || router.asPath === '/news/addNews' ?
                        "text-white w-60 fixed p-3 space-x-4 rounded-lg z-50  hover:border-l-2  hover:bg-gray-900 grid divide-y divide-neutral-200 max-w-xl" :
                        "text-white w-60 fixed p-3 space-x-4 rounded-lg z-50   hover:bg-gray-900 grid divide-y divide-neutral-200 max-w-xl" :
                    router.asPath === '/news' || router.asPath === '/news/addNews' ?
                        menu ?
                            "text-white bg-gray-900 border-l-2  fixed p-3 w-11 space-x-4 rounded-lg z-50 divide-neutral-200 max-w-xl"
                            :
                            "text-white bg-gray-900 border-l-2 transition-all duration-200 ease-in-out fixed p-3 w-60 space-x-4 rounded-lg z-50 divide-neutral-200 max-w-xl"
                        : "text-white fixed p-3  space-x-4 rounded-lg z-50 divide-neutral-200 max-w-xl"
                }>
                    <details className="group " onMouseEnter={() => { sethovering('/news') }} onMouseLeave={() => { sethovering(false) }} >
                        <summary className="flex justify-between items-center font-medium cursor-pointer list-none w-60 ">
                            <span className="flex  w-60 " style={{ opacity: 100 }}>
                                <div className={" flex items-center justify-start text-gray-500 rounded-lg group  w-60 "}  >
                                    <Link href="/news"><i className="fas fa-pencil text-lg"></i>
                                    </Link>
                                    {hovering === '/news' || hovering === '/news/addNews' || !menu ?
                                        <span className="font-medium w-60 transition-all duration-200 text-left pl-3 text-white opacity-100">News</span>
                                        : null}
                                </div>
                            </span>
                        </summary>

                        {hovering === '/news' || hovering === '/news/addNews' || !menu ?
                            <Link href="/news/addNews">
                                <div className="text-neutral-600 group-open:animate-fadeIn w-60 pl-4 ">
                                    <div className={router.asPath === '/news/addNews' ?
                                        "collapse-title w-full text-md font-medium cursor-pointer text-slate-100 text-sm p-3 pb-1"
                                        :
                                        "collapse-title w-full text-md font-medium cursor-pointer hover:text-slate-100 text-sm p-3 pb-1"}>Add News
                                    </div>
                                </div>
                            </Link>
                            : null}
                    </details>
                </div>

            </div>
        </div >


        <div className="pl-16 bg-gray-100 w-full transition-all duration-200 ease-in-out">
            <nav className="bg-white p-2">
                <div className="flex justify-between items-center px-6">
                    {isMobile || (window as any).innerWidth < 640 ? <div style={{ height: "20px" }}> </div> :
                        <button id="menu-button" onClick={() => (window as any).innerWidth < 640 ? toast.error('Layar tampilan tidak didukung') : menu ? expandSidebar(false) : expandSidebar(true)} className="bg-gray-800 rounded w-8 -ml-2">
                            <i className="fas fa-bars text-white text-lg"></i>
                        </button>
                    }
                    <div className="text-left font-bold text-sm text-cyan-800 w-full ml-2 max-sm:-ml-2" id="pageActive">{pageActive}</div>
                    <div className="space-x-4 w-20">
                        <button className="font-bold text-sm text-gray-600 absolute -mt-3 max-sm:right-2" onClick={() => {
                            logOut()
                        }}>
                            <i className="fas fa-power-off "></i>
                            <span className="max-sm:hidden ml-1">Log Out
                            </span>
                        </button>
                    </div>
                </div>
            </nav>
            {children}
        </div>
    </>
    )

}