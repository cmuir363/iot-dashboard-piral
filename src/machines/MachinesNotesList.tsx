import * as React from "react"

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import { Note } from "./machines"

export interface MachinesNotesListProps {
    machinesNotesList: Note[]
}

const MachinesNotesList: React.FC<MachinesNotesListProps> = ({ machinesNotesList}) => {


    let listContent;
    if (machinesNotesList) {
        listContent = (
            machinesNotesList.map((machinesNote, index) => {
                const date = new Date(parseInt(machinesNote.timestamp))
                return (
                    <ListItem key={index}>
                        <div>
                            <Typography variant="subtitle2">
                                {`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
                            </Typography>
                            <div>{machinesNote.message}</div>
                        </div>
                    </ListItem>
                )
            })
        )
    }

    return (
        <div>
            <Typography variant="h6">
                Notes
            </Typography>
            <List>
                {listContent}
            </List>
        </div>
    )
}

export default MachinesNotesList