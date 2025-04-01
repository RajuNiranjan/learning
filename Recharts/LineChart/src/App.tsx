import { LineCharts } from './components/LineChart'
const App = () => {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
        <div className='w-[650px] h-[300px] border rounded-lg p-1'>
            <LineCharts />
        </div>
    </div>
  )
}

export default App