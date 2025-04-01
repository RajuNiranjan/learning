import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {droneTelemetryData, editData} from '../data'

// Create combined data points
const data = editData.map((point, index) => ({
  name: `Point ${point.id}`,
  waypoint: point.altitude,
  drone: droneTelemetryData[Math.min(index, droneTelemetryData.length - 1)].currentAltitude,
  ground: 20 + Math.random() * 24 
}));

export const LineCharts = () => {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="waypoint" stroke="#0000ff" activeDot={{ r: 8 }} name="Waypoint Altitude" />
          <Line type="monotone" dataKey="drone" stroke="#ff0000" activeDot={{ r: 8 }} name="Drone Altitude" />
          <Line type="monotone" dataKey="ground" stroke="#00ff00" activeDot={{ r: 8 }} name="Ground Altitude" />
        </LineChart>
      </ResponsiveContainer>
    );
  }