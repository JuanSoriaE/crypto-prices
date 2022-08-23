import './CoinRow.css';

function CoinRow(props) {
  return (
    <tr onClick={ () => window.location.assign(`/coin/${props.id}`) } className='coin-row'>
      <td>{ props.index }</td>
      <td className='name'>
        <img src={ props.img } alt={ props.name } loading='lazy' />
        <span>{ props.name }</span>
        <span className='symbol'>{ props.symbol.toUpperCase() }</span>
      </td>
      <td className='price'>{ props.price }</td>
      <td className={ 'price-change' + (props.price_change > 0 ? ' percentage-positive' : ' percentage-negative')}>
        { props.price_change > 0 ? '+' +  props.price_change : props.price_change }
      </td>
      <td>{ props.volume }</td>
    </tr>
  );
}

export default CoinRow;
