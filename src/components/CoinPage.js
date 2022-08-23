import './CoinPage.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CoinDetails from './CoinDetails';
import ChartComponent from './ChartComponent';

function CoinPage() {

  let { id } = useParams();
  const [coin, setCoin] = useState({});
  const [chart_data, setChartData] = useState({});
  const [time_lapse, setTimeLapse] = useState(7);
  const [change_data, setChangeData] = useState({});

  const getCoinData = async () => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`);

    setCoin(res.data, changeChangeData(time_lapse));
  };

  const getChartData = async () => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${time_lapse}`);

    setChartData(res.data);
  };

  const changeTimeLapse = (days) => {
    setTimeLapse(days, changeChangeData(days));
  };

  const getPriceChange = () => {
    return coin.market_data.current_price.usd - chart_data.prices[0][1];
  };

  const changeChangeData = (days) => {
    console.log(days);
    switch (days) {
      case 1:
        setChangeData({
          price_change_24h: coin.market_data.price_change_24h,
          price_change_percentage_24h: coin.market_data.price_change_percentage_24h
        });
        break;
    
      case 7:
        setChangeData({
          price_change_7d: getPriceChange(),
          price_change_percentage_7d: coin.market_data.price_change_percentage_7d
        });
        break;

      case 14:
        setChangeData({
          price_change_14d: getPriceChange(),
          price_change_percentage_14d: coin.market_data.price_change_percentage_14d
        });
        break;

      case 30:
        setChangeData({
          price_change_30d: getPriceChange(),
          price_change_percentage_30d: coin.market_data.price_change_percentage_30d
        });
        break;

      case 60:
        setChangeData({
          price_change_60d: getPriceChange(),
          price_change_percentage_60d: coin.market_data.price_change_percentage_60d
        });
        break;

      case 200:
        setChangeData({
          price_change_200d: getPriceChange(),
          price_change_percentage_200d: coin.market_data.price_change_percentage_200d
        });
        break;

      case 365:
        setChangeData({
          price_change_1y: getPriceChange(),
          price_change_percentage_1y: coin.market_data.price_change_percentage_1y
        });
        break;

      default:
        break;
    }

    console.log(change_data);
  };

  const formatTimelapse = (time_lapse) => {
    if (time_lapse === 1) return '24h';
    if(time_lapse === 365) return '1y';
    return time_lapse + 'd';
  };

  useEffect(() => {
    getCoinData();
    getChartData();
  }, []);

    return (
      <div className='coin-main-container'>
        <div className='main-info-container'>
          <img
            src={ coin.image.large }
            className='coin-image'
            alt={ coin.name } />
          <div className='coin-text-container'>
            <span className='coin-name'>{ coin.name }</span>
            <span className='coin-symbol'>{ `(${coin.symbol.toUpperCase()})` }</span>
          </div>
          <div className='coin-price-container'>
            <span className='coin-price'>{ coin.market_data.current_price.usd }</span>
          </div>
          <div className={ 'coin-change-container' + (change_data[Object.keys(change_data)[0]] > 0 ? ' percentage-positive' : ' percentage-negative') }>
            <span
              className='coin-price-change'>
              { 
                change_data[Object.keys(change_data)[0]] > 0 ? `+$${change_data[Object.keys(change_data)[0]]}` : `-$${change_data[Object.keys(change_data)[0]].toString().replace('-', '')}`
              }
              </span>
            <span className='coin-price-change-percentage'>{ `(${change_data[Object.keys(change_data)[1]].toString().replace('-', '')}%)` }</span>
            <span className='coin-price-change-time'>{ formatTimelapse(time_lapse) }</span>
          </div>
        </div>
        <div className='coin-details-container'>
          <CoinDetails 
            description={ coin.description.en }
          />
        </div>
        <ChartComponent
          data={ chart_data }
          changeTimeLapse={ changeTimeLapse } />
      </div>
    );
}

export default CoinPage;
