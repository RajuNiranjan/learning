export const droneTelemetryData = Array.from({length: 5}, (_, i) => ({
  id: String(i + 1),
  name: `drone${i + 1}`,
  batteryVoltage: 15 + Math.random() * 1.5,
  batteryPercentage: Math.floor(Math.random() * 20) + 80,
  altitude: 120 + Math.random() * 30,
  amsl: 480 + Math.random() * 10,
  pitch: (Math.random() - 0.5) * 0.1,
  roll: (Math.random() - 0.5) * 0.05,
  yaw: Math.random() * 0.3,
  airspeed: 12 + Math.random() * 4,
  groundSpeed: 10 + Math.random() * 3,
  currentLatitude: 47.397741 + Math.random() * 0.000005,
  currentLongitude: 8.545593 + Math.random() * 0.000003,
  currentAltitude: 45 + Math.random() * 15,
  satelliteCount: Math.floor(Math.random() * 5) + 9,
  homeLocation: [
    8.545593 + Math.random() * 0.000002,
    47.397741 + Math.random() * 0.000002
  ],
  flightTime: `00:${String(Math.floor(Math.random() * 15) + 5).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  vehicleStatus: {
    armable: true,
    armed: true,
    flying: true,
    landed: false,
    landing: false,
    return_stat: false,
    takeoff: false
  },
  notifications: Math.random() > 0.8 ? ["Low battery warning"] : [],
  mode: Math.random() > 0.2 ? "Mission" : "Loiter",
  rcSignal: Math.floor(Math.random() * 6) + 93,
  location_set: true,
  currentWaypointId: Math.floor(Math.random() * 4),
  previousWaypointId: Math.floor(Math.random() * 3),
  isMissionExecuting: Math.random() > 0.2,
  isMissionPaused: false,
  missionCompleted: Math.floor(Math.random() * 3),
  missionTotal: Math.floor(Math.random() * 3) + 3,
  isGotoExecuting: false
}))
  
  
  export const editData = Array.from({length: 5}, (_, i) => ({
    id: i + 1,
    coordinate: [
      Math.floor(Math.random() * 50) + 10, // Random x between 10-60
      Math.floor(Math.random() * 40) + 15  // Random y between 15-55
    ],
    altitude: Math.floor(Math.random() * 15) + 45, // Random altitude between 45-60
    status: Math.random() > 0.5 // Random boolean
  }))

  
  export const locationData = [
    {
      id: 1,
      coordinate: [8.545857442751782, 47.397774346049914],
      altitude: 50,
      status: false
    },
    {
      id: 2,
      coordinate: [8.546076236618006, 47.39771216882181], 
      altitude: 50,
      status: false
    },
    {
      id: 3,
      coordinate: [8.546165865356357, 47.39779239211316],
      altitude: 50,
      status: false
    },
    {
      id: 4,
      coordinate: [8.546300965356357, 47.39785239211316],
      altitude: 50,
      status: false
    },
    {
      id: 5,
      coordinate: [8.546425865356357, 47.39790239211316],
      altitude: 50,
      status: false
    }
  ]