import * as React from "react"
import {Machine} from "./machines";

const MachinesDetailedView = React.lazy(() => import("./MachinesDetailedView"))
const MachinesMap = React.lazy(() => import("./MachinesMap"))

export interface MachinesDashProps {
    currentMachineId: string;
    selectedIndex: number;
    machinesList: Machine[];
    setCurrentMachineId: (machineId: string) => void;
    eventData: any[];
}

const MachinesDash: React.FC<MachinesDashProps> = ({ currentMachineId, selectedIndex, machinesList, setCurrentMachineId, eventData }) => {

    let content = null
    if (currentMachineId) {
        content = (
            <MachinesDetailedView
                currentMachineId={currentMachineId}
                selectedIndex={selectedIndex}
                eventData={eventData}
            />
        )
    } else {
        content = (
            <MachinesMap
                machinesList={machinesList}
                setCurrentMachineId={setCurrentMachineId}
            />
        )
    }

    return (
        <>{content}</>
    )
}

export default MachinesDash