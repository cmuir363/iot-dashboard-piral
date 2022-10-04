import * as React from 'react';
import { PiletApi } from 'my-app';
import axios from "axios"

const Tile = React.lazy(() => import("./Tile"))
const MachinesPage = React.lazy(() => import("./machines/MachinesPage"))
import MachinesNotifications from "./machines/MachinesNotifications";

const machinesDataUrl = "https://machinestream.herokuapp.com/api/v1/machines"
const wsDataUrl = "ws://machinestream.herokuapp.com/api/v1/events/websocket?vsn=2.0.0"

export function setup(app: PiletApi) {

  app.registerMenu(() =>
    <a href="https://docs.piral.io" target="_blank">Documentation</a>
  );

  app.registerTile(() => <Tile />, {
    initialColumns: 2,
    initialRows: 1,
  });

  const ws = new WebSocket(wsDataUrl)

  ws.onopen = (event) => {
    ws.send('["1", "1", "events", "phx_join", {}]');
  }

  let eventArray = [];
  ws.onmessage = (event) => {
    const eventMessage: any[] = JSON.parse(event.data)
    const data = eventMessage[eventMessage.length - 1]

    if (eventMessage[0] !== "1") {
      const newArray: any[] = pushToEventArray(data, eventArray)
      eventArray = [...newArray]
      app.showNotification(<MachinesNotifications status={data.status} machineId={data.machine_id}/>, {
        autoClose: 10000,
      });
    }
  }

  const connect = app.createConnector(() => {
    return axios.get(machinesDataUrl)
  })

  app.registerPage("/machines", connect( ({ data }) => {
    const machineData = data.data.data
    if (machineData) {
      return <MachinesPage
          data={machineData}
          eventData={eventArray}
      />
    } else {
      alert("There was an error fetching data")
    }
  }))

}


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