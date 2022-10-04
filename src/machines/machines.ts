export const getMachineIdFromUrlParam = () => {
    const url = new URL(window.location.href)
    return url.searchParams.get("id")
}

export interface Note {
    timestamp: string;
    message: string;
}

export const getMachineNotes = (machineId: string): Note[] => {
    const notes: Note[] = JSON.parse(localStorage.getItem(machineId))
    return notes
}

export const setMachineNotes = (machineId: string, notes: Note[]): void => {
    console.log("Saving Notes")
    localStorage.setItem(machineId, JSON.stringify(notes))
}

export interface Machine {
    floor: number;
    id: string;
    install_date: string;
    last_maintenance: string;
    latitude: number;
    longitude: number;
    machine_type: string;
    status: string
}

export interface EventInfo {
    timestamp: string;
    status: string
}

export interface MachineDetailedInfo extends Machine {
    events: EventInfo[]
}