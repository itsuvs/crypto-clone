import React, {useEffect, useState} from 'react'
import './App.css';
import TopTicker from './components/Ticker';
import CurrencyChanger from './components/CurrencyChanger';
import CryptoListings from './components/CryptoListings';
import {Provider} from 'react-redux';
import {store} from './store';
import {useCookies} from 'react-cookie'
import {checkUserCurrency} from './helper/checkUserCurrency'

function App() {
  const [cookie,setCookie] = useCookies()
  const [isAllSet, setIsAllSet] = useState(false)

  useEffect(() => {
    checkUserCurrency(cookie, setCookie)
    .then(() =>{
      setIsAllSet(true)
    })
  },[])

  return (
    <Provider store={store}>
      {
        isAllSet

        ?

        <div className="App">
          <TopTicker/>
          <CryptoListings/>
          <CurrencyChanger/>
        </div>

        :

      <div>
        Loading...
      </div>
      }
    </Provider>
  );
}

export default App;