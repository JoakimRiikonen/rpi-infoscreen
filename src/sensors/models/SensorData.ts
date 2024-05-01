export interface SensorData {
  sensor_data: NodeSensors;
}

export interface NodeSensors {
  [node_id: string]: NodeData;
}

export interface NodeData {
  dt: string;
  sensors: SensorReading[];
}

export interface SensorReading {
  sensor_id: string;
  value: number;
}