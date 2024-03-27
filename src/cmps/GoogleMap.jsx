import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '3.5em' }}>{text}</div>;

export function GoogleMap() {
    const [coords, setCoords] = useState({ lat: 32.0553, lng: 34.7818 })
    const zoom = 11

    function handleClick({ lat, lng }) {
        setCoords({ lat, lng })
    }

    return (
        <div style={{ height: '35vh', width: '90%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBtUFMKT7RP0hd5PxfMBPgnz0roBurUJ8Q" }}
                center={coords}
                defaultZoom={zoom}
                onClick={handleClick}
            >
                <AnyReactComponent
                    {...coords}
                    text="🚩"
                />
            </GoogleMapReact>
        </div>
    );
}