import React from 'react'
import { useSelector } from 'react-redux'

export default function AccordionRow({isAllSet}) {

    const data = useSelector(state => state)
    const marketDataTableRows = data.marketDataArray.map((item, index) => {
        return <tr>
                    <td>
                        {item.exchange}
                    </td>
                    <td>
                        {item.price}
                    </td>
                </tr>
    })
  return (
    <tr className='accordion'>
      <td colSpan={10}>
        {isAllSet ? (
          <table>
            <thead>
              <tr>
                <th>Exchange</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>{marketDataTableRows}</tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </td>
    </tr>
  );
}