import * as React from "react"

import ListItem from '@mui/material/ListItem';

export interface MachinesStatusProps {
    machineTitle: number;
    machineStatus: string;
    heading?: boolean
}

const MachinesStatus: React.FC<MachinesStatusProps> = ({ machineTitle, machineStatus, heading}) => {

    const defaultStyle = {
        color: "green"
    }

    const offlineStyle = {
        color: "red",
    }

    let headerStyle;

    if (heading) {
        headerStyle = {
            fontSize: "2em",
            fontWeight: "bold"
        }
    }

    let indicatorStyle;
    let indicatorMessage;

    if (machineStatus === "running") {
        indicatorStyle=defaultStyle
        indicatorMessage="online"
    } else if (machineStatus === "finished") {
        indicatorStyle=offlineStyle
        indicatorMessage="offline"
    } else if (machineStatus === "errored") {
        indicatorStyle=offlineStyle
        indicatorMessage="offline"
    } else if (machineStatus === "repaired") {
        indicatorStyle=offlineStyle
        indicatorMessage="offline"
    }

    const statusMessage = (
        <div>Status: <span style={indicatorStyle}>{indicatorMessage}</span></div>
    )

    return (

        <div>
            <div style={headerStyle}>Machine {machineTitle}</div>
            <div>{statusMessage}</div>
        </div>
    )
}

export default MachinesStatus