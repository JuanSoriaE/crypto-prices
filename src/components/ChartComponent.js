import './ChartComponent.css';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend 
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartComponent({ data, changeTimeLapse, setChangeData }) {

  const [chart_data, setChartData] = useState([]);

  const getChartData = () => {
    let data_extracted = data.prices.map(ele => {
      return ele[1];
    });

    setChartData(data_extracted);
  };

  const getColorByPriceChange = () => {
    if(chart_data[0] > chart_data[chart_data.length - 1]) return '#ff0000';

    return '#31d400';
  };

  useEffect(() => {
    getChartData();
  }, [data]);

  return (
    <div className='chart-container'>
      <div className='timelapse-tags-container'>
        <button onClick={ () => changeTimeLapse(1) }>24h</button>
        <button onClick={ () => changeTimeLapse(7) }>7d</button>
        <button onClick={ () => changeTimeLapse(14) }>14d</button>
        <button onClick={ () => changeTimeLapse(30) }>30d</button>
        <button onClick={ () => changeTimeLapse(90) }>90d</button>
        <button onClick={ () => changeTimeLapse(180) }>180d</button>
        <button onClick={ () => changeTimeLapse(365) }>1y</button>
      </div>
      <Line
        datasetIdKey='id'
        data={ {
          labels: Array.from(Array(data.prices.length).keys()),
          datasets: [
            {
              id: 1,
              label: '',
              data: chart_data,
              pointBorderWidth: 0,
              borderWidth: 2,
              borderColor: getColorByPriceChange
            }
          ]
        } }
        options={ 
          {
            responsive: true
          }
         } />
    </div>
  )
}

export default ChartComponent;
