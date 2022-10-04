import * as React from "react"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { setMachineNotes, getMachineNotes, Note, MachineDetailedInfo } from "./machines";
import MachinesNotesList from "./MachinesNotesList";
import MachinesStatus from "./MachinesStatus";
import MachinesMap from "./MachinesMap";

export interface MachinesNotesViewProps {
    currentMachineDetails: MachineDetailedInfo,
    currentMachineId: string,
    selectedIndex: number
}

const MachinesNotesView: React.FC<MachinesNotesViewProps> = ({currentMachineDetails, currentMachineId, selectedIndex}) => {

    const [notes, setNotes] = React.useState<Note[]>([])
    const [open, setOpen] = React.useState<boolean>(false)
    const [newNote, setNewNote] = React.useState<string>(null)

    React.useEffect(() => {
        setNotes([])
        const machineNotes = getMachineNotes(currentMachineId)
        if (machineNotes) {
            setNotes(machineNotes)
        }
    }, [currentMachineId])

    const notesLayout = {
        display: "grid",
        height: "100%",
        gridTemplateColumns: "3fr 1fr"
    }


    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = () => {
        setOpen(false)
        const noteObj: Note = {timestamp: Date.now().toString(), message: newNote}
        notes.unshift(noteObj)
        setMachineNotes(currentMachineId, notes)
    }

    const handleChange = (event) => {
        setNewNote(event.target.value)
    }

    let machineStatus;
    let map;
    if (currentMachineDetails) {
        machineStatus = <MachinesStatus
            machineStatus={currentMachineDetails.status}
            machineTitle={selectedIndex}
            heading={true}
        />
        const center = {
            lat: currentMachineDetails.longitude,
            lng: currentMachineDetails.latitude
        }
        map = <MachinesMap machinesList={[currentMachineDetails]} height={"250px"} mapCenter={center}/>
    }

    return (
        <div style={notesLayout}>
            <div>
                <div style={{paddingBottom: "20px"}}>{machineStatus}</div>
                <MachinesNotesList machinesNotesList={notes}/>
            </div>
            <div>
                {map}
                <Button onClick={handleOpen}>Add Note</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Note"
                            type="note"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default MachinesNotesView