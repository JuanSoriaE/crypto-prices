import './TableCoins.css';
import CoinRow from './CoinRow';

function TableCoins({ coins, search, current_page }) {
  
  let filtered_coins = coins.filter(coin => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search));

  return (
    <table>
      <thead>
        <tr>
          <th style={ {width: '5%'} }>#</th>
          <th style={ {width: '35%'} }>Coin name</th>
          <th style={ {width: '20%'} }>Price</th>
          <th style={ {width: '25%'} }>Price Change 24h</th>
          <th style={ {width: '15%'} }>24h Volume</th>
        </tr>
      </thead>
      <tbody>
        { filtered_coins.map((coin, i) => {
          return (<CoinRow
            key={ coin.id }
            id={ coin.id }
            index={ i + 1 + 50 * (current_page - 1) }
            img={ coin.image.replace('large', 'thumb') }
            name={ coin.name }
            symbol={ coin.symbol }
            price={ coin.current_price }
            price_change={ coin.price_change_percentage_24h }
            volume={ coin.total_volume } />)
        }) }
      </tbody>
    </table>
  );
}

export default TableCoins;
