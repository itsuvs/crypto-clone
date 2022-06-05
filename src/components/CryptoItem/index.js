import React from 'react'
import numberFormatter from '../../helper/numberFormatter'
import { useCookies } from 'react-cookie'
import { currencyMultiplier } from '../../helper/currencyMultiplier'
import { useSelector, useDispatch } from 'react-redux'
import { fetchMarketData } from '../../store/action'

export default function CryptoItem({item, index, setRowInsertedAt, rowInsertedAt}) {

  const data = useSelector(state => state)
  const dispatch = useDispatch()
  
  const [cookie] = useCookies()
  const userCurrencyData = currencyMultiplier(cookie, data.fiatCurrencyArray)

  const getIndex = (e) => {
    
    let table = document.getElementById('list-table')
    let difference = parseInt(e.currentTarget.id) - rowInsertedAt 
    
    if ((difference === 0)){
      table.deleteRow(rowInsertedAt)
      setRowInsertedAt(0)
      return
    }
    else if(rowInsertedAt !== 0){
      table.deleteRow(rowInsertedAt)
    }

    var row = table.insertRow(parseInt(e.currentTarget.id));
    var cell = row.insertCell(0);
    cell.setAttribute("colspan", "10")
    cell.innerHTML = 'Loading...'
    
    dispatch(fetchMarketData(item.name.toLowerCase()))
    .then((res) => {
      let dummyDiv = document.createElement('div')
      let exchangeTable = document.createElement('table')
      let header = exchangeTable.createTHead()
      let headerRow = header.insertRow(0)
      let headerRowCellOne = headerRow.insertCell(0).innerHTML = '<b>Exchange</b>'
      let headerRowCellTwo = headerRow.insertCell(1).innerHTML = '<b>Price</b>'
      let tableBody = exchangeTable.createTBody()

      for (let i = 0 ; i < res.data.length ; i++){
        let dataRow = tableBody.insertRow(i)
        let dataRowCellOne = dataRow.insertCell(0).innerHTML = res.data[i].exchange
        let dataRowCellTwo = dataRow.insertCell(1).innerHTML = res.data[i].price
      }
      
      dummyDiv.appendChild(exchangeTable)
      let tableString = dummyDiv.innerHTML
      cell.innerHTML = tableString
    })

    setRowInsertedAt(parseInt(e.currentTarget.id))

  }
  
  return (
    <tr id={index} onClick={getIndex}>
      <td className='mobile-hidden'>
        {item.rank}
      </td>
      <td style={{display: 'flex', alignItems: 'center'}}>
        <img src={item.icon} alt={item.name}/>
        <div>
          <div>
            {item.name}
          </div>
          <div className='item-symbol'>
            {item.symbol}
          </div>
        </div>
      </td>
      <td>
        {userCurrencyData.symbol} {numberFormatter(parseFloat(item.price) * userCurrencyData.rate)}
      </td>
      <td className='mobile-hidden'>
      {userCurrencyData.symbol} {numberFormatter((item.marketCap) * userCurrencyData.rate)}
      </td>
      <td className='mobile-hidden'>
      {userCurrencyData.symbol} {numberFormatter(item.volume * userCurrencyData.rate)}
      </td>
      <td className='mobile-hidden'>
        {numberFormatter(item.totalSupply)}
      </td>
      <td>
        {item.priceChange1h}%
      </td>
    </tr>
  )
}
