import { useState, useEffect } from 'react';
import currencyCountryMap from './currentCountryMap.js';
import styles from '../styles/CurrencyTracker.module.css';

const CurrencyTracker = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [rate, setRate] = useState(null);
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/${baseCurrency}`);
      const data = await response.json();
      setRates(data.conversion_rates);
    };

    fetchRates();
  }, [baseCurrency]);

  useEffect(() => {
    if (rates[targetCurrency]) {
      setRate(rates[targetCurrency]);
    }
  }, [rates, targetCurrency]);

  useEffect(() => {
    if (rate) {
      setConvertedAmount(amount * rate);
    }
  }, [amount, rate]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Currency Exchange Rate Tracker</h1>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Base Currency:</label>
        <select
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
          className={styles.select}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency} - {currencyCountryMap[currency] || 'Unknown Country'}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Target Currency:</label>
        <select
          value={targetCurrency}
          onChange={(e) => setTargetCurrency(e.target.value)}
          className={styles.select}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency} - {currencyCountryMap[currency] || 'Unknown Country'}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>Amount in {baseCurrency}:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={styles.input}
        />
      </div>
      {rate && (
        <div className={styles.exchangeRate}>
          1 {baseCurrency} ({currencyCountryMap[baseCurrency] || 'Unknown Country'}) = {rate} {targetCurrency} ({currencyCountryMap[targetCurrency] || 'Unknown Country'})
        </div>
      )}
      {convertedAmount !== null && (
        <div className={styles.convertedAmount}>
          {amount} {baseCurrency} = {convertedAmount.toFixed(2)} {targetCurrency}
        </div>
      )}
      <button className={styles.button} onClick={() => { /* Optional: add functionality here */ }}>
        Convert
      </button>
    </div>
  );
};

export default CurrencyTracker;
