import React, {useEffect, useState} from 'react'
import { CurrencyChangerBox } from './style'
import { useSelector } from 'react-redux'
import { useCookies } from 'react-cookie'

export default function CurrencyChanger() {

  const data = useSelector(state => state)

  const [cookie, setCookie] = useCookies()

  const [selectedCurrency, setSelectedCurrency] = useState('INR')

  const onChangeCurrency = (e) => {
    setCookie('userCurrency', e.target.value, {path: '/'})
  }

  useEffect(() => {
    if (cookie.userCurrency !== undefined){
      setSelectedCurrency(cookie.userCurrency)
    }else{
      setCookie('userCurrency', selectedCurrency, {path: '/'})
    }
  },[])

  return (
    <CurrencyChangerBox>
        <select onChange={onChangeCurrency}>
          {
            data.fiatCurrencyArray.map((item, index) => {
              return <option value={item.name} key={item.name} selected={cookie.userCurrency === item.name ? true : false}>
                {item.name}
              </option>
            })
          }
        </select>
    </CurrencyChangerBox>
  )
}
