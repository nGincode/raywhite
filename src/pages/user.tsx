/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { Component, useEffect, useState, useMemo } from "react"
import toast, { Toaster } from 'react-hot-toast';
import Link from "next/link";
import axios from "axios";
import DebouncedInput from "./components/debouncedInput";
import Swal from "sweetalert2";
import { faker } from '@faker-js/faker';


export default function User({ userData, setuserData, pageActive, setloadSkel }: any) {


    const [database, setdatabase] = useState<any>();






    const [data, setdata] = useState<any>([]);
    const [modal, setmodal] = useState<any>();
    const [modalEdit, setmodalEdit] = useState<any>();
    const [globalFilter, setGlobalFilter] = useState('')
    const [filter, setFilter] = useState(false);
    const [category, setcategory] = useState<any>([]);
    const [categoryAll, setcategoryAll] = useState<any>();
    const [officeUniq, setofficeUniq] = useState<any>([]);
    const [categoryActive, setcategoryActive] = useState<any>([]);
    const [page, setPage] = useState<any>(1);
    const [pageView, setpageView] = useState<any>(10);

    useMemo(() => {
        const fakerDatabase = (val: any) => {
            let array = [];
            for (let index = 0; index < val; index++) {
                array.push({
                    name: faker.name.fullName(),
                    category: faker.helpers.arrayElement(['customer', 'author', 'super admin', 'BDE', 'advisior', 'admin office', 'principal', 'principal LMI', 'bank officer', 'bank admin', 'bank principal']),
                    office: faker.company.name(),
                    phone: faker.random.numeric(12),
                    email: faker.internet.email(),
                    date: faker.date.birthdate(),
                    active: faker.helpers.arrayElement([true, false]),
                })
            }
            return array;
        }
        let dataFake = fakerDatabase(100);

        let cat = dataFake.map((val: any) => val.category);
        let cateUniq = cat.filter((element: any, index: any) => {
            return cat.indexOf(element) === index;
        }).sort();

        let office = dataFake.map((val: any) => val.office);
        let officeUni = office.filter((element: any, index: any) => {
            return office.indexOf(element) === index;
        }).sort();
        setdatabase(dataFake);
        setcategory(cateUniq);
        setcategoryAll(cateUniq);
        setofficeUniq(officeUni);
        setdata(dataFake.filter((element: any, index: any) => element.category === cateUniq[0]));
        setcategoryActive(cateUniq[0])
    }, [])



    const selectPage = () => {
        let array = [];
        for (let index = 0; index < Math.ceil(data.length / pageView); index++) {
            array.push({
                value: index + 1,
                label: index + 1
            })
        }


        return array
    }

    const camelCaseToWords = (s: string) => {
        const result = s.replace(/([A-Z])/g, ' $1');
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    const arraySearch = (objList: any, text: any) => {
        if (undefined === text || text === "") return objList;
        return objList.filter((product: any) => {
            let flag;
            for (let prop in product) {
                flag = false;
                flag = product[prop]?.toString().toLowerCase().indexOf(text.toLowerCase()) > -1;
                if (flag) break;
            }
            return flag;
        });
    };

    useEffect(() => {
        pageActive(<div><Link href="/">Loan Market</Link>/User Management</div>)

        setloadSkel(true)
        setTimeout(() => {
            setloadSkel(false)
        }, 700);
    }, [pageActive, categoryActive]);


    useEffect(() => {
        if (globalFilter) {
            setdata(arraySearch(data, globalFilter));
        } else {
            setdata(database.filter((element: any, index: any) => element.category === categoryActive))
        }
    }, [globalFilter, categoryActive]);


    const addSubmit = (val: any) => {
        val.preventDefault();
        let dataPost = {
            name: val.target.name.value,
            category: val.target.category.value,
            office: val.target.office.value,
            phone: val.target.phone.value,
            email: val.target.email.value,
            status: val.target.status.value,
        }
        setdata([...data, dataPost])
        setmodal(false);
        toast.success('Berhasil dibuat')
    }


    const filterSubmit = (val: any) => {
        val.preventDefault();

        var selected: any = [];
        let checkboxes = (document.querySelectorAll('[name="categoryFilter"]:checked') as any);
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selected.push(checkboxes[i].value);
            }
        }

        var selected1 = [];
        let checkboxes1 = (document.querySelectorAll('[name="activeFilter"]:checked') as any);
        for (var i = 0; i < checkboxes1.length; i++) {
            if (checkboxes1[i].checked) {
                selected1.push(checkboxes1[i].value);
            }
        }

        // let dataPost = {
        //     active: selected1,
        //     start: val.target.start.value,
        //     end: val.target.end.value,
        //     category: selected,
        // }
        setcategory(selected)
        setFilter(false);
        toast.success('Berhasil dibuat')
    }

    return (
        <div className="p-5">
            <div className="w-full text-right">
                <button onClick={() => {
                    setmodal(true);
                }} className="px-5 py-3 text-sm text-white bg-gray-800  rounded-lg">
                    <i className="fa fa-user mr-1"></i>  Add User
                </button>
                {modal &&
                    <div className="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                        <div className="fixed inset-0 z-50 overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                                <button onClick={() => {
                                                    setmodal(false)
                                                }} className="font-bold float-right -mt-4">X</button>
                                                <h3 className=" font-semibold leading-6 text-gray-900 text-center text-xl" id="modal-title">Add Data</h3>
                                                <form onSubmit={addSubmit}>
                                                    <div className="mt-2">
                                                        <div className="mb-4">
                                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                                                Name
                                                            </label>
                                                            <input required name="name" className="border border-black rounded w-full p-2 text-gray-700" id="name" type="text" placeholder="Name" />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                                                Category
                                                            </label>
                                                            <select required defaultValue='' name="category" className="border border-black rounded w-full p-2 text-gray-700">
                                                                <option value='' disabled>Choose one...</option>
                                                                {category.map((val: any, i: number) => {
                                                                    return <option value={val} key={i}>{camelCaseToWords(val)}</option>
                                                                })}
                                                            </select>

                                                        </div>
                                                        <div className="mb-4">
                                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="office">
                                                                Office
                                                            </label>
                                                            <select required name="office" defaultValue='' className="border border-black rounded w-full p-2 text-gray-700">
                                                                <option value='' disabled>Choose one...</option>
                                                                {officeUniq.map((val: any, i: number) => {
                                                                    return <option value={val} key={i}>{camelCaseToWords(val)}</option>
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className="mb-4">
                                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                                                Phone
                                                            </label>
                                                            <input required name="phone" className="border border-black rounded w-full p-2 text-gray-700" id="phone" type="number" placeholder="Phone" />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                                                Email
                                                            </label>
                                                            <input required name="email" className="border border-black rounded w-full p-2 text-gray-700" id="email" type="email" placeholder="Email" />
                                                        </div>
                                                        <div className="mb-4">
                                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                                                Status
                                                            </label>
                                                            <select required name='status' defaultValue='' className="border border-black rounded w-full p-2 text-gray-700">
                                                                <option value='' disabled>Choose one...</option>
                                                                <option>Active</option>
                                                                <option>Non Active</option>
                                                            </select>
                                                        </div>

                                                        <div className="flex font-sm justify-center mt-10">
                                                            <button type="button" className="p-1 px-4 border-2 border-black rounded mr-3 w-full"
                                                                onClick={() => {
                                                                    setmodal(false);
                                                                }} >Cancel</button>
                                                            <button type="submit" className="p-1 px-4 bg-cyan-500 rounded text-white w-full">Submit </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>

            <div className="bg-white rounded w-full p-5 mt-3  shadow">
                <div className="p-1 flex rounded bg-orange-900 bg-opacity-5">
                    <div className="absolute"><i className="fa fa-search p-1 pt-2.5 pl-2"></i></div>
                    <div className="w-full mr-2">
                        <DebouncedInput
                            value={globalFilter ?? ''}
                            onChange={value => setGlobalFilter(String(value))}
                            className="p-1 rounded   border-black border-2 w-full pl-7 "
                            placeholder="Enter Keyword"
                        /></div>
                    <div className="">
                        <button onClick={() => {
                            !filter ? setFilter(true) : setFilter(false)
                        }} className="p-1.5 text-sm text-gray-800 border-black border-2 bg-white w-20  rounded">
                            <i className="fa fa-filter mr-1"></i>  Filter
                        </button>
                        {filter &&
                            <div className="absolute right-10 mt-3 bg-white text-base z-50 list-none  rounded shadow max-sm:left-0 max-sm:mt-0 max-sm:fixed max-sm:h-screen max-sm:top-0 max-sm:w-full" id="dropdown" >
                                <form id="formFilter" onSubmit={filterSubmit}>
                                    <div className="px-4 py-3">
                                        <span className="block text-sm mb-1 font-semibold">Time Range</span>
                                        <div className="flex font-sm bg-gray-100  px-4 py-2">
                                            <input type="month" name="start" defaultValue="2023-05" className="w-32 p-1 border-2 border-black rounded" />
                                            <div className="mx-1 p-1">to</div>
                                            <input type="month" name="end" defaultValue="2023-05" className="w-32 p-1 border-2 border-black rounded" />
                                        </div>
                                    </div>
                                    <div className="px-4">
                                        <span className="block text-sm mb-1 font-semibold">Category</span>
                                        <div className="flex font-sm bg-gray-100  px-4 py-2">
                                            <div>
                                                {categoryAll.map((val: any, i: number) => {
                                                    if (!category.find((vall: any) => vall === val)) {
                                                        return <div key={i}><input type="checkbox" name="categoryFilter" value={val} defaultChecked={false} /> {camelCaseToWords(val)}</div>
                                                    } else {
                                                        return <div key={i}><input type="checkbox" name="categoryFilter" value={val} defaultChecked={true} /> {camelCaseToWords(val)}</div>
                                                    }

                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 mt-2">
                                        <span className="block text-sm mb-1 font-semibold">Status</span>
                                        <div className="flex font-sm bg-gray-100  px-4 py-2">
                                            <div>
                                                <input type="checkbox" name="activeFilter" defaultChecked={true} value='active' /> Active
                                                <br />
                                                <input type="checkbox" name="activeFilter" defaultChecked={true} value='non active' /> Non Active
                                            </div>
                                        </div>
                                    </div>
                                    <div className="px-4 mt-2">
                                        <div className="flex font-sm justify-center my-3">
                                            <button type="button" className="p-1 px-4 border-2 border-black rounded mr-3 w-full"
                                                onClick={() => {
                                                    ($('input[type="checkbox"]') as any).prop('checked', false);
                                                }} >Clear</button>
                                            <button type="submit" className="p-1 px-4 bg-cyan-500 rounded text-white w-full"
                                            >Apply Filter </button>
                                        </div>
                                    </div>
                                </form>
                            </div>}
                    </div>
                </div>

                <div className="w-full mt-2 ">
                    <div className="flex flex-wrap justify-center font-bold">
                        {category.map((val: any, i: number) => {
                            return (
                                <div key={i}>
                                    {categoryActive === val ?
                                        <button onClick={() => { setcategoryActive(val); setdata(database.filter((element: any, index: any) => element.category === val)) }} key={i} className="border-b-4 p-2 border-cyan-800 text-cyan-800">
                                            {camelCaseToWords(val)}
                                        </button>
                                        :
                                        <button onClick={() => { setcategoryActive(val); setdata(database.filter((element: any, index: any) => element.category === val)) }} key={i} className="border-b-4 p-2 border-cyan-800 opacity-30 text-cyan-800">
                                            {camelCaseToWords(val)}
                                        </button>
                                    }
                                </div>)
                        })}
                    </div>

                    <div className="mt-5 max-md:overflow-auto">
                        <table className="w-full text-gray-700">
                            <thead className="bg-cyan-900  font-semibold text-white ">
                                <tr>
                                    <td className="p-3 w-9">No.</td>
                                    <td className="p-3">Name</td>
                                    <td className="p-3">Phone</td>
                                    <td className="p-3">Email</td>
                                    <td className="p-3 w-52">Action</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((val: any, i: number) => {
                                    let rowEnd = (page * pageView);
                                    let rowStart = rowEnd - pageView;
                                    if (i >= rowStart && i < rowEnd)
                                        return (
                                            <tr key={i} className={i % 2 !== 0 ? "bg-white hover:bg-gray-50" : 'bg-gray-100 hover:bg-gray-50'}>
                                                <td className="p-3">{i + 1}</td>
                                                <td className="p-3">{val.name}</td>
                                                <td className="p-3">{val.phone}</td>
                                                <td className="p-3">{val.email}</td>
                                                <td >
                                                    <button onClick={() => {
                                                        setmodalEdit(val);
                                                    }} className="p-1.5 text-sm text-gray-800 border-black border-2  m-1 bg-white w-20  rounded">
                                                        <i className="fa fa-pencil mr-1"></i>  Edit
                                                    </button>
                                                    <button onClick={() => {
                                                        Swal.fire({
                                                            title: 'Are you sure?',
                                                            text: `Delete ${val.name} data!`,
                                                            icon: 'warning',
                                                            showCancelButton: true,
                                                            confirmButtonColor: '#3085d6',
                                                            cancelButtonColor: '#d33',
                                                            confirmButtonText: 'Yes, delete it!'
                                                        }).then((result) => {
                                                            if (result.isConfirmed) {
                                                                let arrayData: any = [];
                                                                data.map((vall: any, ii: number) => {
                                                                    if (i !== ii) {
                                                                        arrayData.push(vall);
                                                                    }
                                                                })
                                                                setdata(arrayData)
                                                                Swal.fire(
                                                                    'Deleted!',
                                                                    'Your file has been deleted.',
                                                                    'success'
                                                                )
                                                            }
                                                        })
                                                    }} className="p-1.5 text-sm text-white bg-red-700 w-20  m-1  rounded">
                                                        <i className="fa fa-trash mr-1"></i>  Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                })}

                                {!data.length ?
                                    <tr>
                                        {globalFilter ?
                                            <td className="text-center font-semibold bg-gray-100 p-3" colSpan={6}>Search data not found</td>
                                            :
                                            <td className="text-center font-semibold bg-gray-100 p-3" colSpan={6}>No data display</td>}
                                    </tr> : null}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <div className="flex max-sm:flex-wrap font-semibold mt-3 pt-5 bottom-2 bg-white w-full mr-24 shadow-md p-3 rounded-lg px-5">
                <div className="w-44 mb-3">

                    <select className="px-1 border-2 border-black rounded mr-2" value={pageView} onChange={(val: any) => {
                        setpageView(val.target.value)
                    }}>
                        <option value={10}>{10}</option>
                        <option value={20}>{20}</option>
                        <option value={30}>{30}</option>
                        <option value={40}>{40}</option>
                        <option value={50}>{50}</option>

                    </select>

                    {(page * pageView) - pageView < 1 ? 1 : (page * pageView) - pageView}-{(page * pageView) > data.length ? data.length : (page * pageView)} of {data.length}
                </div>
                <div className="w-full text-right text-sm">
                    <span>The page you`re on</span>
                    <select className="px-1 border-2 border-black rounded ml-2" value={page} onChange={(val: any) => {
                        setPage(val.target.value)
                    }}>
                        {selectPage().map((val: any, i: number) => {
                            return <option key={i} value={val.value}>{val.label}</option>

                        })}

                    </select> |
                    {page > 1 ?
                        <button onClick={() => {
                            setPage(page - 1)
                        }} className="px-1  border-2 border-black rounded ml-2">
                            <i className="fa fa-arrow-left"></i>
                        </button>
                        :
                        <button className="px-1  border-2 border-black border-opacity-50 rounded ml-2">
                            <i className="fa fa-arrow-left"></i>
                        </button>
                    }

                    {page < (selectPage()).length ?
                        <button onClick={() => {
                            setPage(page + 1)
                        }} className="px-1  border-2 border-black rounded ml-2">
                            <i className="fa fa-arrow-right"></i>
                        </button>
                        :
                        <button className="px-1  border-2 border-black border-opacity-50 rounded ml-2">
                            <i className="fa fa-arrow-right"></i>
                        </button>
                    }
                </div>
            </div>

            {
                modalEdit &&
                <div className="relative z-50 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <button onClick={() => {
                                                setmodalEdit(false)
                                            }} className="font-bold float-right -mt-4">X</button>
                                            <h3 className=" font-semibold leading-6 text-gray-900 text-center text-xl" id="modal-title">Edit Data</h3>
                                            <div className="mt-2">
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                                        Name
                                                    </label>
                                                    <input defaultValue={modalEdit.name} className="border border-black rounded w-full p-2 text-gray-700" id="name" type="text" placeholder="Name" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                                                        Category
                                                    </label>
                                                    <select defaultValue={modalEdit.category} className="border border-black rounded w-full p-2 text-gray-700">
                                                        <option value='' disabled>Choose one...</option>
                                                        {category.map((val: any, i: number) => {
                                                            return <option value={val} key={i}>{camelCaseToWords(val)}</option>
                                                        })}
                                                    </select>

                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="office">
                                                        Office
                                                    </label>
                                                    <select defaultValue={modalEdit.office} className="border border-black rounded w-full p-2 text-gray-700">
                                                        <option value='' disabled>Choose one...</option>
                                                        {officeUniq.map((val: any, i: number) => {
                                                            return <option value={val} key={i}>{camelCaseToWords(val)}</option>
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                                        Phone
                                                    </label>
                                                    <input defaultValue={modalEdit.phone} className="border border-black rounded w-full p-2 text-gray-700" id="phone" type="number" placeholder="Phone" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                                        Email
                                                    </label>
                                                    <input defaultValue={modalEdit.email} className="border border-black rounded w-full p-2 text-gray-700" id="email" type="emil" placeholder="Email" />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                                                        Status
                                                    </label>
                                                    <select defaultValue={modalEdit.status} className="border border-black rounded w-full p-2 text-gray-700">
                                                        <option value='' disabled>Choose one...</option>
                                                        <option value={0} >Active</option>
                                                        <option value={1}>Non Active</option>
                                                    </select>
                                                </div>

                                                <div className="flex font-sm justify-center mt-10">
                                                    <button className="p-1 px-4 border-2 border-black rounded mr-3 w-full"
                                                        onClick={() => {
                                                            setmodalEdit(false);
                                                        }} >Cancel</button>
                                                    <button className="p-1 px-4 bg-cyan-500 rounded text-white w-full"
                                                        onClick={() => {
                                                            setmodalEdit(false);
                                                        }}
                                                    >Submit </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div >
    )
}