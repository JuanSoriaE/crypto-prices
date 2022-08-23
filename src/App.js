import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import TableCoins from './components/TableCoins';
import { HiOutlineChevronRight, HiOutlineChevronLeft } from 'react-icons/hi';

function App() {
  
  const [coins, setCoins] = useState([]);
  const [current_page, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const getData = async () => {
    const res = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${current_page}&sparkline=false&localization=false`);
    
    setCoins(res.data);
  };

  const disableButton = () => {
    const previous_arrow = document.getElementsByClassName('left-arrow');
    const next_arrow = document.getElementsByClassName('right-arrow');
    const previous_container = document.getElementsByClassName('previous-page-container');
    const next_container = document.getElementsByClassName('next-page-container');

    if(current_page === 1) {
      previous_arrow[0].classList.add('disable');
      previous_container[0].classList.add('disable');
    } else {
      if(current_page === 268) {
        next_arrow[0].classList.add('disable');
        next_container[0].classList.add('disable');
      } else {
        previous_arrow[0].classList.remove('disable');
        next_arrow[0].classList.remove('disable');
        previous_container[0].classList.remove('disable');
        next_container[0].classList.remove('disable');
      }
    }
  };

  const changePage = (add) => {
    if(add === -1) {
      if(current_page === 1) return;
    } else {
      if(current_page === 268) return;
    }

    setCurrentPage(current_page + add);

    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  useEffect(() => {
    getData();
    disableButton();
  }, [current_page]);

  return (
    <div className='App'>
      <div className='search-input-container'>
        <input type='text' placeholder='Search coin' className='search-input'
          onChange={ e => setSearch(e.target.value.toLowerCase()) } />
      </div>
      <div className='change-page-direct-access-container'>
        <HiOutlineChevronLeft className='left-arrow' onClick={ () => changePage(-1) } />
        <HiOutlineChevronRight className='right-arrow' onClick={ () => changePage(1) } />
      </div>
      <div className='table-container'>
        <TableCoins 
          coins={ coins } 
          search={ search } 
          current_page={ current_page } />
      </div>
      <div className='change-page-container'>
        <div className='previous-page-container' onClick={ () => changePage(-1) }>
          <HiOutlineChevronLeft />
          <span>Previous Page</span>
        </div>
        <div>
          <span onClick={ () => changePage(-current_page + 1) }
            style={ {cursor: 'pointer'} }>1... </span>
          <span>{ current_page }</span>
        </div>
        <div className='next-page-container' onClick={ () => changePage(1) }>
          <span>Next Page</span>
          <HiOutlineChevronRight />
        </div>
      </div>
    </div>
  );
}

export default App;
