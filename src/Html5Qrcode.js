import React, { useState, useEffect } from "react";
import { Button, Space, Input, Select } from "antd";
import './App.css';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode"

const {Option} = Select;
let qrboxFunction = function (viewfinderWidth, viewfinderHeight) {
    let minEdgePercentage = 0.9; // 70%
    let minEdgeSize = Math.min(viewfinderWidth, viewfinderHeight);
    let qrboxSize = Math.floor(minEdgeSize * minEdgePercentage);
    return {
        width: qrboxSize,
        height: qrboxSize / 2,
    };
}
const videoConstraints = {
    width: 4000,
    height: 3000,
    facingMode: "environment",
    focusMode: "continuous",
};

const config = {
    fps: 60,
    qrbox: qrboxFunction,
    videoConstraints,
    formatsToSupport: [Html5QrcodeSupportedFormats.CODE_128, Html5QrcodeSupportedFormats.PDF_417],
};


const Html5QrCode = () => {
    let [scanner, setScanner] = useState();
    const [backCameras, setBackCameras] = useState([]);
    const [selectedCameraId, setSelectedCameraId] = useState("");

    function onScanSuccess(decodedText, decodedResult) {
        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${ decodedText }`, decodedResult);
        setText(decodedText)
        scanner?.stop();
    }

    let [text, setText] = useState("");

    useEffect(() => {
        const html5QrCode = new Html5Qrcode("reader");
        setScanner(html5QrCode)
    }, []);

    useEffect(() => {
        Html5Qrcode.getCameras().then(cameras => {
            /**
             * devices would be an array of objects of type:
             * { id: "id", label: "label" }
             */
            if (cameras && cameras.length) {
                const backCameras = cameras.filter(camera => camera.label?.includes('back'))
                setBackCameras(backCameras);
                if(backCameras.length > 0) {
                    setSelectedCameraId(backCameras[0].id);
                }
            }
        }).catch(err => {
            // handle err
        });
    }, [])


    return (<Space direction={ "vertical" } size={ 20 }
                   style={ {display: 'flex', justifyContent: 'center', alignItems: ' center', marginTop: 30} }>
        <h1>PDF417 Scanner demo (html5-qrcode)</h1>
        <div>Use <a href="https://barcode.tec-it.com/en/PDF417" rel="noreferrer" target={ "_blank" }>THIS LINK</a> to
            generate barcode
            for testing
        </div>

        <Input value={ text } placeholder={ "Scan result here" } style={ {minWidth: 240} } />
        { backCameras?.length > 1 && <div>
            <div>Select camera:</div>
            <Select value={ selectedCameraId } style={ {width: 240} } onChange={ value => {
                setSelectedCameraId(value);
                scanner?.stop();
                scanner?.start({deviceId: {exact: value}}, config, onScanSuccess);
            } }>
                {
                    backCameras.map(element => (
                        <Option key={ element.id } value={ element.id }>{ element.label }</Option>
                    ))
                }
            </Select>
        </div> }
        <Space>
            <Button type={ "primary" } onClick={ () => {
                setText("")
                scanner.start({deviceId: {exact: selectedCameraId}}, config, onScanSuccess);
            } }> Scan barcode</Button>

            <Button onClick={ () => {
                scanner?.stop();
            } }> Stop scanning</Button>
        </Space>

    </Space>)

}

export default Html5QrCode;
