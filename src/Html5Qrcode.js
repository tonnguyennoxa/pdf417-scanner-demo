import React, { useState, useEffect } from "react";
import { Button, Select, Space, Input } from "antd";
import './App.css';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode"

const {Option} = Select;


const config = {
    fps: 10,
    qrbox: {width: 320, height: 100},
    formatsToSupport: [Html5QrcodeSupportedFormats.PDF_417, Html5QrcodeSupportedFormats.CODE_128]
};


function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${ error }`);
}

export default function () {
    let [scanner, setScanner] = useState();

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

    return (<Space direction={ "vertical" } size={ 20 }
                   style={ {display: 'flex', justifyContent: 'center', alignItems: ' center', marginTop: 30} }>
        <h1>PDF417 Scanner demo (html5-qrcode)</h1>
        <div>Use <a href="https://barcode.tec-it.com/en/PDF417" target={ "_blank" }>THIS LINK</a> to generate barcode
            for testing
        </div>

        <Input value={ text } placeholder={"Click button bellow"}/>

        <Button type={ "primary" } onClick={ () => {
            setText("")
            scanner.start({facingMode: "environment"}, config, onScanSuccess);
        } }> Scan barcode</Button>

    </Space>)

}
