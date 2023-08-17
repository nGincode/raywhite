/* eslint-disable @next/next/no-img-element */
import React, { Component, useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export default function Index({ userData, setuserData, pageActive, setloadSkel }: any) {
    useEffect(() => {
        pageActive(<div><Link href="/">Loan Market</Link>/Dashboard</div>)
        setloadSkel(true)
        setTimeout(() => {
            setloadSkel(false)
        }, 700);
    }, [pageActive, setloadSkel]);

    let options1 = {
        chart: {
            id: 'apexchart',
            toolbar: {
                show: false
            },
        },
        colors: ['#0891b2'],
        tooltip: {
            x: {
                show: false
            },
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false
        },
        yaxis: {
            labels: {
                show: false,
            }
        },
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
    }
    let options2 = {
        chart: {
            id: 'apexchart',
            toolbar: {
                show: false
            },
        },
        colors: ['#F44336'],
        tooltip: {
            x: {
                show: false
            },
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false
        },
        yaxis: {
            labels: {
                show: false,
            }
        },
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
    }
    let options3 = {
        chart: {
            id: 'apexchart',
            toolbar: {
                show: false
            },
        },
        colors: ['#ca8a04'],
        tooltip: {
            x: {
                show: false
            },
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: false
        },
        yaxis: {
            labels: {
                show: false,
            }
        },
        xaxis: {
            labels: {
                show: false
            },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
    }

    let series1 = [{
        name: 'series-1',
        data: [10, 30, 20, 10, 70, 80, 90, 100, 90,]
    }]

    let series2 = [{
        name: 'series-2',
        data: [10, 90, 20, 20, 100, 80, 70, 10, 100,]
    }]

    let series3 = [{
        name: 'series-3',
        data: [40, 90, 20, 50, 90, 80, 70, 60, 80,]
    }]

    return (
        <div className="p-10">
            <div className="text-cyan-700">
                <div className="font-bold text-xl">Dashboard</div>
                <div className="font-semibold text-gray-500">User Quantity</div>
            </div>

            <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 mt-3">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 justify-center ">
                    <div className="w-36 rounded-lg bg-white p-5 py-10 text-center shadow">
                        <div className="flex justify-center">
                            <div className="bg-gray-800 rounded-lg p-4 w-16 ">
                                <i className="fas fa-user text-white text-lg"></i>
                            </div>
                        </div>
                        <div className="font-bold mt-8">9823</div>
                        <div className="mt-2">User</div>
                    </div>
                    <div className="w-36 rounded-lg bg-white p-7 py-10 text-center shadow">
                        <div className="flex justify-center">
                            <div className="bg-gray-800 rounded-lg p-4 w-16 ">
                                <i className="fas fa-user text-white text-lg"></i>
                            </div>
                        </div>
                        <div className="font-bold mt-8">9823</div>
                        <div className="mt-2">User</div>
                    </div>
                    <div className="w-36 rounded-lg bg-white p-7 py-10 text-center shadow">
                        <div className="flex justify-center">
                            <div className="bg-gray-800 rounded-lg p-4 w-16 ">
                                <i className="fas fa-user text-white text-lg"></i>
                            </div>
                        </div>
                        <div className="font-bold mt-8">9823</div>
                        <div className="mt-2">User</div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">
                    <div className="w-full p-4 h-16 rounded-lg bg-white text-center flex shadow">
                        <div className="bg-gray-800 p-1 w-8 rounded"><i className="fas fa-user text-white text-lg"></i></div>
                        <div className="font-bold text-right w-full -mt-2"><small className="font-normal">Admin Office</small> <br /> 4</div>
                    </div>
                    <div className="w-full p-4 h-16 rounded-lg bg-white text-center flex shadow">
                        <div className="bg-gray-800 p-1 w-8 rounded"><i className="fas fa-user text-white text-lg"></i></div>
                        <div className="font-bold text-right w-full -mt-2"><small className="font-normal">Admin Office</small> <br /> 4</div>
                    </div>
                    <div className="w-full p-4 h-16 rounded-lg bg-white text-center flex shadow">
                        <div className="bg-gray-800 p-1 w-8 rounded"><i className="fas fa-user text-white text-lg"></i></div>
                        <div className="font-bold text-right w-full -mt-2"><small className="font-normal">Admin Office</small> <br /> 4</div>
                    </div>
                    <div className="w-full p-4 h-16 rounded-lg bg-white text-center flex shadow">
                        <div className="bg-gray-800 p-1 w-8 rounded"><i className="fas fa-user text-white text-lg"></i></div>
                        <div className="font-bold text-right w-full -mt-2"><small className="font-normal">Admin Office</small> <br /> 4</div>
                    </div>
                    <div className="w-full p-4 h-16 rounded-lg bg-white text-center flex shadow">
                        <div className="bg-gray-800 p-1 w-8 rounded"><i className="fas fa-user text-white text-lg"></i></div>
                        <div className="font-bold text-right w-full -mt-2"><small className="font-normal">Admin Office</small> <br /> 4</div>
                    </div>
                    <div className="w-full p-4 h-16 rounded-lg bg-white text-center flex shadow">
                        <div className="bg-gray-800 p-1 w-8 rounded"><i className="fas fa-user text-white text-lg"></i></div>
                        <div className="font-bold text-right w-full -mt-2"><small className="font-normal">Admin Office</small> <br /> 4</div>
                    </div>
                    <div className="w-full p-4 h-16 rounded-lg bg-white text-center flex shadow">
                        <div className="bg-gray-800 p-1 w-8 rounded"><i className="fas fa-user text-white text-lg"></i></div>
                        <div className="font-bold text-right w-full -mt-2"><small className="font-normal">Admin Office</small> <br /> 4</div>
                    </div>
                    <div className="w-full p-4 h-16 rounded-lg bg-white text-center flex shadow">
                        <div className="bg-gray-800 p-1 w-8 rounded"><i className="fas fa-user text-white text-lg"></i></div>
                        <div className="font-bold text-right w-full -mt-2"><small className="font-normal">Admin Office</small> <br /> 4</div>
                    </div>
                    <div className="w-full p-4 h-16 rounded-lg bg-white text-center flex shadow">
                        <div className="bg-gray-800 p-1 w-8 rounded"><i className="fas fa-user text-white text-lg"></i></div>
                        <div className="font-bold text-right w-full -mt-2"><small className="font-normal">Admin Office</small> <br /> 4</div>
                    </div>
                </div>
            </div>


            <div className="text-cyan-700 mt-5">
                <div className="font-bold text-xl">Data & Analytics</div>
                <div className="font-semibold text-gray-500">Show Update of Post</div>
            </div>

            <div className="rounded-xl w-full bg-white p-3 mt-5 shadow">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-7">
                    <div className="border-l-2 rounded border-cyan-600 p-2 w-full flex flex-wrap shadow ">
                        <div className=" border-gray-600 text-gray-600 font-semibold"> Belum di proses <br /> <div className=" border-gray-600 font-bold"> 9,123</div></div>
                        <div className="-mt-4 -mb-4"><Chart options={options1} series={series1} type="line" width={150} height={70} /></div>
                    </div>
                    <div className="border-l-2 rounded border-red-600 p-2 w-full flex flex-wrap shadow ">
                        <div className=" border-gray-600 text-gray-600 font-semibold"> Sudah di proses <br /> <div className=" border-gray-600 font-bold"> 9,123</div></div>
                        <div className="-mt-4 -mb-4"><Chart options={options2} series={series2} type="line" width={150} height={70} /></div>
                    </div>
                    <div className="border-l-2 rounded border-yellow-600 p-2 w-full flex flex-wrap shadow ">
                        <div className=" border-gray-600 text-gray-600 font-semibold"> Customer <br /> <div className=" border-gray-600 font-bold"> 9,123</div></div>
                        <div className="-mt-4 -mb-4 "><Chart options={options3} series={series3} type="line" width={150} height={70} /></div>
                    </div>
                </div>

                <div className="flex flex-wrap text-xs">
                    <div className="w-1/2 p-5">
                        <div className="font-semibold"><i className="fa fa-close mr-1"></i> Belum di proses</div>
                        <div className="shadow w-full bg-gray-100 rounded-lg mt-1">
                            <div className="bg-cyan-600 rounded-lg text-xs leading-none py-1 text-center text-white" style={{ width: "43%" }}>43%</div>
                        </div>

                        <div className="font-semibold mt-2"><i className="fa fa-check mr-1 "></i> Sudah di proses</div>
                        <div className="shadow w-full bg-gray-100 rounded-lg mt-1">
                            <div className="bg-red-600 rounded-lg text-xs leading-none py-1 text-center text-white " style={{ width: "83%" }}>83%</div>
                        </div>
                    </div>
                    <div className="w-1/2 p-5">
                        <div className="font-semibold"><i className="fa fa-user mr-1"></i> Pria</div>
                        <div className="shadow w-full bg-gray-100 rounded-lg mt-1">
                            <div className="bg-yellow-600 rounded-lg text-xs leading-none py-1 text-center text-white" style={{ width: "13%" }}>13%</div>
                        </div>

                        <div className="font-semibold mt-2">
                            <i className="fa fa-user mr-1"></i> Wanita</div>
                        <div className="shadow w-full bg-gray-100 rounded-lg mt-1">
                            <div className="bg-yellow-600 rounded-lg text-xs leading-none py-1 text-center text-white" style={{ width: "56%" }}>56%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}