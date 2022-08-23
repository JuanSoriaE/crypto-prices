import './CoinDetails.css';
import { HiChevronDown } from 'react-icons/hi';

function CoinDetails({ description }) {
  return (
    <details className='details-container'>
      <summary>
        <span>Details </span>
        <HiChevronDown
          className='icon' />
      </summary>
      <div className='blur-rule'></div>
      <p className='description'>
        { description.includes('<') ? 'Not avaible Description.' : description }
      </p>
    </details>
  );
}

export default CoinDetails;
