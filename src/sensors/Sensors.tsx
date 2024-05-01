import React, { useEffect, useState } from "react";
import { getSensorData } from "./sensorservice";
import { SensorData } from "./models/SensorData";
import Sensor from "./Sensor";

const Sensors = () => {

  const [sensorData, setSensorData] = useState<SensorData | undefined>(undefined);

  useEffect(() => {
    updateSensorData();

    const reqInterval = setInterval(() => {
      updateSensorData();
    }, 60 * 1000);

    return () => clearInterval(reqInterval);
  }, [])

  const updateSensorData = () => {
    console.log('updating sensor data');
    getSensorData()
      .then(data => {
        setSensorData(data);
        console.log(data);
      });
  }

  if (!sensorData) {
    return (
      <div className='sensors'>
      </div>
    )
  }

  return (
    <div className='sensors'>
      {Object.keys(sensorData.sensor_data).map(nodeId => (
        <Sensor
          key={nodeId}
          nodeId={nodeId}
          nodeData={sensorData.sensor_data[nodeId]}
        />
      ))}
    </div>
  )
}

export default Sensors;