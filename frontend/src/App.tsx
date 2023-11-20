import React, { useState, useEffect } from 'react';
import './AppStyle.ts';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">CryptoCap</div>
    </nav>
  );
};

const CryptoTable = ({ cryptoData }) => {
  return (
    <table className="crypto-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Symbol</th>
          <th>Price (USD)</th>
          <th>Market Cap (USD)</th>
          <th>Change (24h)</th>
        </tr>
      </thead>
      <tbody>
        {cryptoData.map(crypto => (
          <tr key={crypto.id}>
            <td>{crypto.rank}</td>
            <td>{crypto.name}</td>
            <td>{crypto.symbol}</td>
            <td>{crypto.priceUsd}</td>
            <td>{crypto.marketCapUsd}</td>
            <td>{crypto.changePercent24Hr}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const LoadMoreButton = ({ onClick }) => (
  <button className="load-more" onClick={onClick}>
    Load More
  </button>
);

const App = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCryptoData = async page => {
    const pageSize = 20; // Adjust as needed
    const apiUrl = `https://api.coincap.io/v2/assets?limit=${pageSize}&offset=${(page - 1) * pageSize}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setCryptoData(prevData => [...prevData, ...data.data]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    fetchCryptoData(currentPage);
  }, [currentPage]);

  return (
    <div>
      <Navbar />
      <div className="main-content">
        <h1>CryptoCap Landing Page</h1>
        <CryptoTable cryptoData={cryptoData} />
        <LoadMoreButton onClick={loadMore} />
      </div>
    </div>
  );
};

export default App;
