import React from "react";
import { NodeData } from "./models/SensorData";
import MetricCard from "./MetricCard";

export interface Sensor {
  nodeId: string;
  nodeData: NodeData;
}

const Sensor = ({ nodeId, nodeData }: Sensor) => {

  return (
    <div className='sensor'>
      <h1 className='sensor-id'>
        {nodeId}
      </h1>
      <div className='sensor-stats'>
        <MetricCard 
          icon="thermometer-half"
          text={`${nodeData.sensors.filter(d => d.sensor_id === "temperature")[0]?.value.toFixed(1)} °C`}
        />
        <MetricCard 
          icon="moisture"
          text={`${nodeData.sensors.filter(d => d.sensor_id === "moisture")[0]?.value.toFixed(1)}%`}
        />
      </div>
    </div>
  )
}

export default Sensor