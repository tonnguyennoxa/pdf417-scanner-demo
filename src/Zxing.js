import React, { useState, useEffect } from "react";
import { Button, Space } from "antd";
import './App.css';

import {
    BrowserPDF417Reader,
    BrowserCodeReader
} from "@zxing/browser";

import { isSafari } from "react-device-detect";


const  Zxing = () => {

    const [setVideoInputDevices] = useState([]);
    const [selectedDeviceId, setSelectedDeviceId] = useState("");


    const pdf417Reader = new BrowserPDF417Reader();



    const checkCameraPermission = async () => {
        let isCameraPermissionGranted = false;
        if (isSafari) {
            await  navigator.mediaDevices.enumerateDevices().then(devices => {
                isCameraPermissionGranted = !!devices.find(device => device.kind === 'videoinput' && device.deviceId !== '');
            })
        } else {
            const cameraPermission = await navigator.permissions.query({name: "camera"});

            if (cameraPermission.state === "granted") {
                isCameraPermissionGranted = true;
            }
        }
        console.log({isCameraPermissionGranted})
        return isCameraPermissionGranted;
    }
    const getCameras = async () => {
        const isCameraPermissionGranted = await checkCameraPermission();
        if(!isCameraPermissionGranted)
        {
            await navigator.mediaDevices.getUserMedia({video: true});
        }
        BrowserCodeReader
            .listVideoInputDevices()
            .then(devices => {
                setVideoInputDevices(devices);
                let backCamera = devices.find(device => device.label.includes('back'));
                const selectCamera = backCamera || devices?.[devices?.length - 1];
                setSelectedDeviceId(selectCamera?.deviceId);
            })
            .catch(err => {
                console.error(err);
            });
    }


    useEffect(() => {
        // eslint-disable-next-line
        // getCameras()
    }, []);




    function decodeOnce() {
        pdf417Reader.decodeOnceFromVideoDevice(selectedDeviceId, 'video').then((result) => {
            console.log(result)
            alert("Text result: " + result.text)
        }).catch((err) => {
            console.error(err)
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
        <div>Use <a href="https://barcode.tec-it.com/en/PDF417" target={ "_blank" } rel="noreferrer"  >THIS LINK</a> to generate barcode
            for testing
        </div>

        {/*<div>*/}
        {/*    <div>Select camera:</div>*/}
        {/*    <Select value={ selectedDeviceId } style={ {width: 240} } onChange={ value => setSelectedDeviceId(value) }>*/}
        {/*        {*/}
        {/*            videoInputDevices.map(element => (*/}
        {/*                <Option key={ element.deviceId } value={ element.deviceId }>{ element.label }</Option>*/}
        {/*            ))*/}
        {/*        }*/}
        {/*    </Select>*/}
        {/*</div>*/}
        <Space size={ 20 }>

            <Button type={ "primary" } onClick={ startScanning } disabled={ !selectedDeviceId }> Scan barcode</Button>
            {/*<Button onClick={ () => resetClick() }> Reset </Button>*/}
        </Space>
        { selectedDeviceId && <video id="video" height={ 400 } /> }
    </Space>);

}

export default Zxing;
