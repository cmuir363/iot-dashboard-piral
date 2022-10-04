import * as React from "react"

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import { MachineDetailedInfo } from "./machines"

interface MachineEventsViewProps {
    eventData: any[]
}

const MachinesEventsView: React.FC<MachineEventsViewProps> = ({ eventData }) => {

    let listContent;
    if (eventData.length > 0) {
        listContent = (
            eventData.map((event, index) => {
                if (index === 0) {
                    return (
                        <ListItem key={index}>
                            <div>
                                <Typography variant="h5">{event.status}</Typography>
                                <Typography variant="h6">{event.timestamp}</Typography>
                            </div>
                        </ListItem>)
                }
                return (
                    <ListItem key={index}>
                        <div>
                            <Typography variant="subtitle2">{event.status}</Typography>
                            <Typography variant="body1">{event.timestamp}</Typography>
                        </div>
                    </ListItem>
                )
            })
        )
    }

    return (
        <List>
            {listContent}
        </List>
    )
}

export default MachinesEventsView