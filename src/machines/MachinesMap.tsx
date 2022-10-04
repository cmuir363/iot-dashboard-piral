import * as React from "react"

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import {Machine} from "./machines";

export interface MachinesMapProps {
    machinesList: Machine[];
    setCurrentMachineId?: (machineId: string) => void;
    height?: string;
    mapCenter?: any
}

const MachinesMap: React.FC<MachinesMapProps> = ({machinesList, setCurrentMachineId, height, mapCenter}) => {

    let containerStyle;
    if (height){
        containerStyle = {
            height: height
        }
    } else {
        containerStyle = {
            height: '100vh'
        };
    }


    let center;
    if (mapCenter) {
        center = mapCenter
    } else {
        center = {
            lat: 48.09582590168821,
            lng: 11.523934612394468
        };
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ""
    })

    let markers = null;
    if (machinesList) {
        markers = (machinesList.map((machine, index) => {
            const position = {
                lat: machine.longitude,
                lng: machine.latitude
            }
            const handleOnMarkerClick = () => {
                setCurrentMachineId(machine.id)
            }
            return (
                <Marker
                    position={position}
                    onClick={handleOnMarkerClick}
                    key={machine.id}
                />
            )
        }))
    }

    return isLoaded ? (
        <GoogleMap
            center={center}
            mapContainerStyle={containerStyle}
            zoom={18}
        >
            {markers}
        </GoogleMap>
    ) : <></>
}

export default MachinesMap