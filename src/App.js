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
    const [scanning, setScanning] = useState(false);

    const pdf417Reader = new BrowserPDF417Reader();


    const getCameras = async () => {
        await navigator.mediaDevices.getUserMedia({video: true});

        BrowserCodeReader
            .listVideoInputDevices()
            .then(devices => {
                console.log('List camera:', devices);
                setVideoInputDevices(devices);

            })
            .catch(err => {
                console.error(err);
            });
    }


    useEffect(() => {
        getCameras()
    }, []);


    function resetClick() {
        setText("");
        setError("");
        setSelectedDeviceId("");
    }


    function decodeOnce() {
        pdf417Reader.decodeOnceFromVideoDevice(selectedDeviceId, 'video').then((result) => {
            console.log(result)
            alert("Text result: " + result.text);
            resetClick();
        }).catch((err) => {
            console.error(err)
        })
    }

    function decodeContinuously() {
        pdf417Reader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
            if (result) {
                console.log(result)

            }
            if (err && !(err instanceof NotFoundException)) {
                console.error(err)
            }
        })
    }


    const startScanning = () => {
        if (selectedDeviceId) {
            console.log(`Started decode from camera with id ${ selectedDeviceId }`);
            decodeOnce()
        }
    }

    return (<Space direction={ "vertical" } size={ 20 }
                   style={ {display: 'flex', justifyContent: 'center', alignItems: ' center', marginTop: 30} }>
        <h1>PDF417 Scanner demo (zxing)</h1>
        <div>Use <a href="https://barcode.tec-it.com/en/PDF417" target={ "_blank" }>THIS LINK</a> to generate barcode
            for testing
        </div>

        <div>
            <div>Select camera:</div>
            <Select value={ selectedDeviceId } style={ {width: 240} } onChange={ value => setSelectedDeviceId(value) }>
                {
                    videoInputDevices.map(element => (
                        <Option key={ element.deviceId } value={ element.deviceId }>{ element.label }</Option>
                    ))
                }
            </Select>
        </div>
        <Space size={ 20 }>

            <Button type={ "primary" } onClick={ startScanning } disabled={ !selectedDeviceId }> Scan barcode</Button>
            <Button onClick={ () => resetClick() }> Reset </Button>
        </Space>
        <input type="file" accept="video/*" capture="camera"/   >

            { error && <div>Error: <br />{ error }</div> }
            { selectedDeviceId && <video id="video" height={ 400 } /> }
    </Space>
)

}
