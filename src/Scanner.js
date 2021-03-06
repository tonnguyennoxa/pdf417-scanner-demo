import React, { useEffect } from "react";
import { Button, Space, Input } from "antd";
import './App.css';
import Webcam from "react-webcam";


import { Html5QrcodeScanner } from "html5-qrcode"

const Scanner = () => {
    function onScanSuccess(decodedText, decodedResult) {
        // handle the scanned code as you like, for example:
        console.log(`Code matched = ${ decodedText }`, decodedResult);
    }

    function onScanFailure(error) {
        // handle scan failure, usually better to ignore and keep scanning.
        // for example:
        console.warn(`Code scan error = ${ error }`);
    }

    useEffect(() => {
        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            {fps: 20, qrbox: {width: 250, height: 250}},
            /* verbose= */ false);
        html5QrcodeScanner.render(onScanSuccess, onScanFailure)
    }, [])
    return null;
}

export default Scanner;
