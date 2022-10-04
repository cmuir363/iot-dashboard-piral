import * as React from "react"

export interface MachinesNotificationsProps {
    status: string,
    machineId: string
}

const MachinesNotifications: React.FC<MachinesNotificationsProps> = ({ status, machineId }) => {
    return (
        <a href={`/machines?id=${machineId}`}>
            <div>Machine {machineId}</div>
            <div>{status}</div>
        </a>
    )
}

export default MachinesNotifications