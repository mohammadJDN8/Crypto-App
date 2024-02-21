import React from "react";
import ChartUp from "../../assest/chart-up.svg";
import ChartDown from "../../assest/chart-down.svg";
import { RotatingLines } from "react-loader-spinner";
import styles from "../modules/TableCoin.module.css";
import { marketChart } from "../../services/CryptoApi";
function TableCoin({ coins, isLoading, setChart }) {
  console.log(coins);
  return (
    <div className={styles.container}>
      {isLoading ? (
        <RotatingLines
          strokeColor="#3874ff"
          strokeWidth="3"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coin</th>
              <th>Name</th>
              <th>Price</th>
              <th>24H</th>
              <th>Total volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <TableRow coin={coin} key={coin.id} setChart={setChart} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TableCoin;

const TableRow = ({ coin, setChart }) => {
  const {
    id,
    image,
    name,
    symbol,
    current_price,
    total_volume,
    price_change_percentage_24h,
  } = coin;
  const showHandler = async () => {
    
    try {
      const res = await fetch(marketChart(id));
      const json = await res.json();
      console.log(json);
      setChart({...json,coin});
    } catch (error) {
      setChart(null);
    }
  };
  return (
    <tr>
      <td>
        <div onClick={showHandler} className={styles.symbol}>
          <img src={image} alt={name} />
          <span>{symbol.toUpperCase()}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>{current_price.toLocaleString()}</td>
      <td
        className={
          price_change_percentage_24h > 0 ? styles.sucsses : styles.error
        }
      >
        {price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>{total_volume.toLocaleString()}</td>
      <td>
        <img
          src={price_change_percentage_24h > 0 ? ChartUp : ChartDown}
          alt={name}
        />
      </td>
    </tr>
  );
};
