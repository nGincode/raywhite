import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2'


import Select from "react-select";
import SelectCreate from "react-select/creatable";
import AsyncSelect from "react-select/async";

export default function ReactSelect({
    search,
    create,
    multi,
    id,
    name,
    data,
    defaultValue,
    className,
    csrf_token,
    createUrl,
    method,
    api_token,
    datapost,
    setSearchValue,
    required }: any) {
    if (defaultValue && multi) {
        var dataSelect: any = [...defaultValue].concat(data);
    } else {
        var dataSelect: any = data;
    }

    const [options, setoptions] = useState<any>(dataSelect);
    const [value, setvalue] = useState<any>('');

    const handleAsync = async (req: any, valueSearch: any) => {
        try {
            await axios({
                method: method,
                url: createUrl,
                data: req,
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    Authorization: `Bearer ${api_token}`,
                    "X-CSRF-TOKEN": csrf_token,
                },
            }).then((res) => {
                if (res.data.response === "success") {
                    toast("success", res.data.message);
                    setoptions((options: any) => [
                        ...options,
                        { value: res.data.id, label: valueSearch },
                    ]);
                    setvalue({ value: res.data.id, label: valueSearch });
                } else {
                    toast("error", res.data.message);
                }
            });
        } catch (error: any) {
            toast("error", error.message);
        }
    };

    useEffect(() => {
        setvalue(defaultValue);
    }, [defaultValue]);

    const handleOnChangeReactSelect = (val: any) => {
        setvalue(val);
        if (setSearchValue) setSearchValue(val);
    };

    const handleOnChangeDefault = (val: any) => {
        setvalue(val.target.value);
        if (setSearchValue) setSearchValue(val.target.value);
    };

    const handleChangeCreate = (val: any) => {
        if (val.__isNew__) {
            Swal.fire({
                icon: "info",
                title: "Create Category",
                text: `Are You sure want to create ${val.value}`,
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirm",
            }).then((result: any) => {
                if (result.isConfirmed) {
                    handleAsync({ ...datapost, name: val.value }, val.label);
                } else {
                    setvalue("");
                }
            });
        } else {
            setvalue({ value: val.value, label: val.label });
        }
    };

    return (
        <>
            {data?.length ?
                <>
                    {search && create ? (
                        <SelectCreate
                            value={value}
                            name={name}
                            placeholder="Choose..."
                            onChange={handleChangeCreate}
                            options={options}
                            createOptionPosition="first"
                            className="form-control"
                            classNamePrefix="react-select"
                            id={id}
                        />
                    ) : search ? (
                        <Select
                            options={dataSelect}
                            name={name}
                            value={value ? value : ""}
                            onChange={handleOnChangeReactSelect}
                            className={"form-control " + className}
                            classNamePrefix="react-select"
                            id={id}
                            required={required}
                            isOptionDisabled={(dataSelect: any) => dataSelect.disabled}
                        />
                    ) : multi ? (
                        <Select
                            id={id}
                            name={name}
                            isMulti
                            options={dataSelect}
                            value={value}
                            onChange={handleOnChangeReactSelect}
                            className={(className ?? "")}
                            styles={{
                                input: (base) => ({
                                    ...base,
                                    'input': {
                                        boxShadow: 'none',
                                        border: 'none'
                                    }
                                }),
                                control: (provided: any, state: any) => ({
                                    ...provided,
                                    boxShadow: "none",
                                    border: "black"
                                }),
                                menu: (provided: any, state: any) => ({
                                    ...provided,
                                    // border: "none",
                                    // boxShadow: "none"
                                    // borderRadius: '10px'
                                }),
                                option: (provided: any, state: any) => ({
                                    ...provided,
                                    // backgroundColor: state.isFocused && "lightgray",
                                    // color: state.isFocused && "red"
                                })
                            }}
                        />
                    ) : (
                        <select
                            name={name}
                            id={id}
                            value={value}
                            onChange={handleOnChangeDefault}
                            className={`form-control ` + (className ?? "")}
                        >
                            <option value="" disabled>
                                Choose one
                            </option>
                            {data.map((val: any, i: number) => {
                                return (
                                    <option key={i} value={val.value}>
                                        {val.label}
                                    </option>
                                );
                            })}
                        </select>
                    )}
                </>
                : null}
        </>
    );

}