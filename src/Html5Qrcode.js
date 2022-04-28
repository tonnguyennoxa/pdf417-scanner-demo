import React, { useState, useEffect } from "react";
import { Button, Space, Input } from "antd";
import './App.css';
import { Html5Qrcode } from "html5-qrcode"



const config = {
    fps: 10,
    qrbox: {width: 320, height: 200},
};



const Html5QrCode=  () =>  {
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
        <div>Use <a href="https://barcode.tec-it.com/en/PDF417"  rel="noreferrer" target={ "_blank" }>THIS LINK</a> to generate barcode
            for testing
        </div>

        <Input value={ text } placeholder={"Click button bellow"}/>

        <Button type={ "primary" } onClick={ () => {
            setText("")
            scanner.start({facingMode: "environment"}, config, onScanSuccess);
        } }> Scan barcode</Button>

    </Space>)

}

export default Html5QrCode;
