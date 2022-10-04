import * as React from "react"
import axios from "axios"

import MachinesNotesView from "./MachinesNotesView";
import MachinesEventsView from "./MachinesEventsView";

export interface MachinesDetailedViewProps {
    currentMachineId: string;
    selectedIndex: number;
    eventData: any[];
}

const MachinesDetailedView: React.FC<MachinesDetailedViewProps> = ({ currentMachineId, selectedIndex, eventData}) => {
    const machinesUrl=`https://machinestream.herokuapp.com/api/v1/machines/${currentMachineId}`
    const [machineDetailedInfo, setMachineDetailedInfo] = React.useState(null)

    React.useEffect(() => {
        axios.get(machinesUrl)
            .then(data => {
                setMachineDetailedInfo(data.data.data)
            })
            .catch(err => console.log(err))
    }, [currentMachineId])

    const viewLayout = {
        display: "grid",
        gridTemplateRows: "3fr 2fr",
        height: "100vh"
    }

    return (
        <div style={viewLayout}>
            <MachinesNotesView
                currentMachineDetails={machineDetailedInfo}
                currentMachineId={currentMachineId}
                selectedIndex={selectedIndex}
            />
            <MachinesEventsView
                eventData={eventData}
            />
        </div>
    )
}

export default MachinesDetailedView