import * as React from "react"
import { useHistory } from "react-router-dom";

import { getMachineIdFromUrlParam, Machine } from "./machines"
import MachinesNotifications from "./MachinesNotifications";

const MachinesDash = React.lazy(() => import("./MachinesDash"))
const MachinesList = React.lazy(() => import("./MachinesList"))

const wsDataUrl = "ws://machinestream.herokuapp.com/api/v1/events/websocket?vsn=2.0.0"

export interface MachinesPageProps {
    data: Machine[];
    eventData: any[];
}

const MachinesPage: React.FC<MachinesPageProps> = ({ data, eventData }) => {
    const history = useHistory()
    const [currentMachineId, setCurrentMachineId] = React.useState<string>(null)
    const [selectedIndex, setSelectedIndex] = React.useState(null);
    const [eventArray, setEventArray] = React.useState(eventData)


    const pageLayoutStyle = {
        display: "grid",
        gridTemplateColumns: "1fr 4fr",
        height: "100vh"
    }

    // check for machine id in url on startup
    React.useEffect(() => {
        const machineId = getMachineIdFromUrlParam()
        if (machineId) {
            setCurrentMachineId(machineId)
        }

        const ws = new WebSocket(wsDataUrl)

        ws.onopen = (event) => {
            ws.send('["1", "1", "events", "phx_join", {}]');
        }

        ws.onmessage = (event) => {
            const eventMessage: any[] = JSON.parse(event.data)
            const data = eventMessage[eventMessage.length - 1]

            if (eventMessage[0] !== "1") {
                const newArray: any[] = pushToEventArray(data, eventArray)
                setEventArray([...newArray])
            }
        }

    }, [])

    // update url when state changes
    React.useEffect(() => {
        if(currentMachineId) {
            history.push(`/machines?id=${currentMachineId}`)
        } else {
            history.push("/machines")
        }
    }, [currentMachineId])

    return (
        <div style={pageLayoutStyle}>
            <div>
                <MachinesList
                    data={data}
                    setCurrentMachineId={setCurrentMachineId}
                    selectedIndex={selectedIndex}
                    setSelectedIndex={setSelectedIndex}
                />
            </div>
            <div>
                <MachinesDash
                    currentMachineId={currentMachineId}
                    selectedIndex={selectedIndex}
                    machinesList={data}
                    setCurrentMachineId={setCurrentMachineId}
                    eventData={eventArray}
                />
            </div>
        </div>
    )
}

export default MachinesPage

function pushToEventArray(eventInfo, eventArray) {
    if (eventArray.length > 3) {
        eventArray.pop()
        eventArray.unshift(eventInfo)
        return eventArray
    } else {
        eventArray.unshift(eventInfo)
        return eventArray
    }
}