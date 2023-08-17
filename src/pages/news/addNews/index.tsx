/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { Component, useEffect, useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import axios from "axios";
import ReactSelect from "@/pages/components/reactSelect";
import dynamic from 'next/dynamic'
// const Editor = dynamic(() => import('../../components/editorCK'), {
//     ssr: false
// })
import Editor from '../../components/editor';

export default function AddNews({ userData, setuserData, pageActive, setloadSkel }: any) {
    useEffect(() => {
        pageActive(<div><Link href="/">Loan Market</Link>/<Link href="/news">News</Link>/Add News</div>)
        setloadSkel(true)
        setTimeout(() => {
            setloadSkel(false)
        }, 700);
    }, [pageActive, setloadSkel]);

    const [editorLoaded, setEditorLoaded] = useState(false);
    const [data, setData] = useState("");
    useEffect(() => {
        setEditorLoaded(true);
    }, []);
    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImage = async (event: any) => {
        const file = event.target.files[0];
        const base64 = await convertBase64(file);
        (document.getElementById('img') as HTMLElement).innerHTML = `<img style='height:100px' src="${base64}" />`
    };

    return (
        <div className="p-5">
            <div className="p-5 bg-white rounded w-full">
                <div className="text-cyan-700">
                    <div className="font-bold text-lg">Add News or Articel</div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                            Category
                        </label>
                        <ReactSelect data={[{ label: "Advisior", value: 'advisior' }]} id="category" defaultValue="" name="category" className="border border-black rounded w-full p-2 text-gray-700" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input placeholder="Write the title of the news" type="text" name="title" className="border border-black rounded w-full p-2 text-gray-700" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metaTitle">
                            Meta Title
                        </label>
                        <input placeholder="Write the meta title of the news" type="text" name="metaTitle" className="border border-black rounded w-full p-2 text-gray-700" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="metaDesc">
                            Meta Desc
                        </label>
                        <input placeholder="Write the description of the news" type="text" name="metaDesc" className="border border-black rounded w-full p-2 text-gray-700" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="slug">
                            Slug
                        </label>
                        <input placeholder="Write the slug of the news" type="text" name="slug" className="border border-black rounded w-full p-2 text-gray-700" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="intro">
                            Intro
                        </label>
                        <input placeholder="Write the intro of the news" type="text" name="intro" className="border border-black rounded w-full p-2 text-gray-700" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Cover Images
                        </label>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                            <div id="img">
                                <i className="fa fa-image fa-3x"></i>
                            </div>
                        </label>
                        <input type="file" name='file' id="file" className="hidden" accept="image/*" onChange={(val: any) => {
                            uploadImage(val)
                        }} />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
                            Content
                        </label>
                        <Editor
                            name="content"
                            onChange={(data: string) => {
                                setData(data);
                            }}
                            editorLoaded={editorLoaded}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tag">
                            Tag
                        </label>
                        <ReactSelect multi={true} data={[{ label: "Advisior", value: 'advisior' }]} id="tag" defaultValue="" name="tag" className="border border-black rounded w-full text-gray-700" />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                            Post Schedule
                        </label>
                        <div className="flex w-full">
                            <input type="date" name="date" className="border w-full mr-2 border-black rounded p-2 text-gray-700" />
                            <input type="time" name="time" className="border w-full border-black rounded p-2 text-gray-700" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                            Status
                        </label>
                        <ReactSelect data={[{ label: "Advisior", value: 'advisior' }]} id="status" defaultValue="" name="status" className="border border-black rounded w-full p-2 text-gray-700" />
                    </div>
                </div>
            </div>
        </div>
    )
}