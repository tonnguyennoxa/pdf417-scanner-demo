import React, { useState, useEffect } from "react";
import { Button, Select, Space } from "antd";
import './App.css';

import {
    BrowserPDF417Reader,
    BrowserCodeReader
} from "@zxing/browser";

import { NotFoundException } from "@zxing/library";

const {Option} = Select;

export default function () {

    const [videoInputDevices, setVideoInputDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const pdf417Reader = new BrowserPDF417Reader();

    useEffect(() => {
        BrowserCodeReader
            .listVideoInputDevices()
            .then(devices => {
                console.log('List camera:', devices);
                setVideoInputDevices(devices);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);


    function resetClick() {
        setText("");
        setError("");
        setSelectedDeviceId("");
    }



    useEffect(() => {
            if(selectedDeviceId)
            {
                pdf417Reader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
                    if (result) {
                        console.log(result)
                        alert("Text result: " + result.text);
                        resetClick();
                    }
                    if (err && !(err instanceof NotFoundException)) {
                        console.error(err)
                    }
                })
                // pdf417Reader.scanOneResult('video', false, true, false)
                console.log(`Started decode from camera with id ${ selectedDeviceId }`);
            }
        },
        [selectedDeviceId]
    );


    return (<Space direction={ "vertical" } size={ 30 }>
        <h1>PDF417 Scanner demo (zxing)</h1>
        <div>Use <a href="https://barcode.tec-it.com/en/PDF417" target={ "_blank" }>THIS LINK</a> to generate barcode
            for testing
        </div>


        <Space>
            <Select>
                {}
            </Select>
            <Button type={ "primary" } onClick={ () => {
                setSelectedDeviceId(videoInputDevices?.[0]?.deviceId);
            } }> Scan barcode</Button>
            {/*<Button onClick={() => resetClick() }> Reset </Button>*/ }
        </Space>
        { error && <div>Error: <br />{ error }</div> }
        <video id="video" height={400} />
    </Space>)

}
