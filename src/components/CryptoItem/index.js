import React, { useState } from "react";
import numberFormatter from "../../helper/numberFormatter";
import { useCookies } from "react-cookie";
import { currencyMultiplier } from "../../helper/currencyMultiplier";
import { useSelector, useDispatch } from "react-redux";
import { fetchMarketData } from "../../store/action";
import { CryptoItemBox } from "./style";
import AccordionRow from "../AccordionRow";

export default function CryptoItem({
  item,
  index
}) {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const [cookie] = useCookies();
  const userCurrencyData = currencyMultiplier(cookie, data.fiatCurrencyArray);

  const [isAccordionActive, setIsAccordionActive] = useState(false);
  const [isAllSet, setIsAllSet] = useState(false);

  const handleAccordionToggle = () => {
    setIsAccordionActive(!isAccordionActive);

    dispatch(fetchMarketData(item.name.toLowerCase())).then((res) => {
      setIsAllSet(true);
    });
  };

  const marketDataTableRows = data.marketDataArray.map((item, index) => {
    return (
      <div className="data-list-item">
        <div>{item.exchange}</div>
        <div>{item.price}</div>
      </div>
    );
  });

  return (
    <CryptoItemBox isAccordionActive={isAccordionActive}>
      <tr onClick={handleAccordionToggle}>
        <td className="mobile-hidden">{item.rank}</td>
        <td style={{ display: "flex", alignItems: "center" }}>
          <img src={item.icon} alt={item.name} />
          <div>
            <div>{item.name}</div>
            <div className="item-symbol">{item.symbol}</div>
          </div>
        </td>
        <td>
          {userCurrencyData.symbol}{" "}
          {numberFormatter(parseFloat(item.price) * userCurrencyData.rate)}
        </td>
        <td className="mobile-hidden">
          {userCurrencyData.symbol}{" "}
          {numberFormatter(item.marketCap * userCurrencyData.rate)}
        </td>
        <td className="mobile-hidden">
          {userCurrencyData.symbol}{" "}
          {numberFormatter(item.volume * userCurrencyData.rate)}
        </td>
        <td className="mobile-hidden">{numberFormatter(item.totalSupply)}</td>
        <td>{item.priceChange1h}%</td>
      </tr>
      <tr className="accordion">
        <td colSpan={10}>
          {isAllSet ? (
            <div className="market-data-container">
              <div className="header">
                <div>Exchange</div>
                <div>Price</div>
              </div>
              <div className="data-list">{marketDataTableRows}</div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </td>
      </tr>
    </CryptoItemBox>
  );
}
