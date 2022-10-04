import * as React from "react"

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';

import { Machine } from "./machines";
import MachinesStatus from "./MachinesStatus";

interface MachineListProps {
    data: Machine[];
    setCurrentMachineId: (machineId: string) => void;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
}

const MachinesList: React.FC<MachineListProps> = ({ data, setCurrentMachineId, selectedIndex, setSelectedIndex}) => {

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
        machineId: string
    ) => {
        setSelectedIndex(index);
        setCurrentMachineId(machineId)
    };

    return (
        <>
            <List
                sx={{ overflow: "auto", maxHeight: "100vh"}}
            >
                {
                    data.map( (machine: Machine, index) => {
                        return <ListItem key={machine.id}>
                            <ListItemButton
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index, machine.id)}
                            >
                                <MachinesStatus
                                    machineStatus={machine.status}
                                    machineTitle={index}
                                />
                            </ListItemButton>
                        </ListItem>
                    })
                }
            </List>
        </>
    )
}

export default MachinesList