import React, { useEffect, useState } from "react";
import { TickerBox } from "./style";
import Marquee from "react-fast-marquee";
import { useSelector, useDispatch } from "react-redux";
import { fetchMarketData, generateTickerArray } from "../../store/action";
import numberFormatter from "../../helper/numberFormatter";

export default function TopTicker() {
  const data = useSelector((state) => state);
  const dispatch = useDispatch();

  const [isAllSet, setIsAllSet] = useState(false);

  useEffect(() => {
    dispatch(fetchMarketData("bitcoin")).then((apiResponse) => {
      let tickerArray = [];
      for (let i = 0; i < 5; i++) {
        tickerArray.push(apiResponse.data[i]);
      }
      dispatch(generateTickerArray(tickerArray));
      setIsAllSet(true);
    });
  }, []);

  return (
    <TickerBox>
      {isAllSet ? (
        <Marquee gradient={false} speed={90} pauseOnHover={true}>
          <div className="data-container">
            <div
              style={{
                background: "#8a2c1a",
                height: "40px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Bitcoin
            </div>
            {data.tickerArray.map((item, index) => {
              return (
                <div className="exchange-container">
                  <div className="exchange-name">{item.exchange}</div>
                  <div className="exchange-rate">
                    $ {numberFormatter(parseFloat(item.price))}
                  </div>
                </div>
              );
            })}
          </div>
        </Marquee>
      ) : (
        <div></div>
      )}
    </TickerBox>
  );
}
