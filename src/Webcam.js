import React, { useState, useEffect } from "react";
import { Button, Space, Input } from "antd";
import './App.css';
import { Html5Qrcode } from "html5-qrcode"
import Webcam from "react-webcam";


const videoConstraints = {
    facingMode: "environment"
};
const WebcamView = () => {
    const [deviceId, setDeviceId] = React.useState({});
    const [devices, setDevices] = React.useState([]);

    const handleDevices = React.useCallback(
        mediaDevices =>
            setDevices(mediaDevices.filter(({ kind }) => kind === "videoinput")),
        [setDevices]
    );

    React.useEffect(
        () => {
            navigator.mediaDevices.enumerateDevices().then(handleDevices);
        },
        [handleDevices]
    );
    return (<Space direction={ "vertical" } size={ 20 }
                   style={ {display: 'flex', justifyContent: 'center', alignItems: ' center', marginTop: 30} }>
        <div>webcam nè</div>
        {devices.map((device, key) =>{
            console.log('device', device);
            return( (
                <div style={{display:'flex', flexDirection: 'column'}}>
                    <Webcam height={400} width={300} audio={false} videoConstraints={{ deviceId: device.deviceId }} />
                    {device.label || `Device ${key + 1}`}
                   <br/> =======================================
                </div>

            ))
        })}
    </Space>)
}

export default WebcamView;
