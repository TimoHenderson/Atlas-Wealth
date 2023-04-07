import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getUsers, transaction } from '../api_services/UsersService';
import { getStocks } from '../api_services/StocksService';
import Home from '../components/home/Home.js';
import View from '../components/view/View.js';
import ButtonAppBar from '../components/app/AppBar.js';
import ApiTest from '../components/ApiTest.js';
import Message from '../components/app/Message';
import ChartTheme from '../styles/ChartTheme';
import SplashPage from '../components/app/SplashPage';

const SharesPortfolio = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState({ text: '', severity: 'info' }); //severity can be error warning info success


  const darkTheme = createTheme({
    palette: {
      // mode: 'dark',
      primary: {
        main: '#242d7d',
        // dark:'#242d7d'
      },
      secondary: {
        main: '#f50057'
      },
      text: {
        primary: '#ffffff',
        secondary: '#ffffff',
      },
      background: {
        // paper: '#163C7E',
        // default: '#6c6c6c',
        paper: '#8699c1',
        default: '#0f2248',
      }
    },
    typography: {
      fontSize: 12,
      fontWeightMedium: 600
    },
    shape: {
      borderRadius: 5,
    },
  })

  const [allUsers, setUsers] = useState([]);
  const [allStocks, setAllStocks] = useState(null);
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [user, setUser] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();

    const fetchStocks = async () => {
      const stocks = await getStocks();
      setAllStocks(stocks);
    };
    fetchStocks();
  }, []);

  const selectSymbol = (symbol) => {
    setSelectedSymbol(symbol);
  };

  // DATA - {stockSymbol: value, numshares: value}
  const addShares = (newShareData) => {
    const temp = [...allUsers];
    const match = allStocks.find(
      (stock) => stock.symbol === newShareData.stockSymbol
    );
    transaction(
      allUsers[user]._id,
      newShareData.stockSymbol,
      Number(newShareData.numshares),
      Number(match.closingValue),
      'purchase'
    ).then((response) => {
      temp[user] = response;
      setUsers(temp);
    });
    setMessage({
      text: `Added ${newShareData.numshares} shares in ${newShareData.stockSymbol}`,
      severity: 'success',
    });
    setShowMessage(true);
  };

  //DATA - number / SINGLESTOCK - stock
  const sellShares = (data, singleStock) => {
    const temp = [...allUsers];
    const match = allStocks.find((stock) => stock.symbol === singleStock.symbol);
    transaction(
      allUsers[user]._id,
      singleStock.symbol,
      data,
      match.closingValue,
      'sale'
    ).then((response) => {
      temp[user] = response;
      setUsers(temp);
    });
    setMessage({
      text: `Sold ${data} shares in ${singleStock.symbol}`,
      severity: 'success',
    });
    setShowMessage(true);
  };

  const deleteShare = (singleStock) => {
    const temp = { ...user };
    const index = temp.shareValues.indexOf(singleStock);
    temp.shareValues.splice(index, 1);
    setUser(temp);
  };

  const editShare = (data, singleStock) => {
    const temp = { ...user };

    const index = temp.shareValues.indexOf(singleStock);
    temp[index] = data;
    setUser(temp);
  };

  const selectedStock = allStocks ? allStocks.find((stock) => stock.symbol === selectedSymbol) : null

  return (

    <ThemeProvider theme={darkTheme}>
      {allUsers[user] && allStocks ? (
        <Router>
          <ChartTheme />
          <Paper elevation={10} sx={{ bgcolor: 'background.default' }} style={{ minHeight: '100vh', height: '100%' }}>
            <ButtonAppBar user={allUsers[user]} />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    addShares={addShares}
                    deleteShare={deleteShare}
                    sellShares={sellShares}
                    editShare={editShare}
                    user={allUsers[user]}
                    allStocks={allStocks}
                    selectSymbol={selectSymbol}
                  />
                }
              />
              <Route
                path="/view"
                element={
                  <View
                    user={allUsers[user]}
                    deleteShare={deleteShare}
                    sellShares={sellShares}
                    editShare={editShare}
                    allStocks={allStocks}
                    addShares={addShares}
                    selectSymbol={selectSymbol}
                    selectedStock={selectedStock}
                  />
                }
              />
              <Route path="/apitest" element={<ApiTest />} />
            </Routes>
          </Paper>
        </Router>
      ) : (
        <SplashPage />
      )}
      <Message
        show={showMessage}
        hide={() => setShowMessage(false)}
        message={message}
      />
    </ThemeProvider>

  );
};
export default SharesPortfolio;

// const addToPreviousPortfolio = (data, singleStock) => {
//   const newDate = new Date();
//   const year = newDate.toLocaleString('default', { year: 'numeric' });
//   const month = newDate.toLocaleString('default', { month: '2-digit' });
//   const day = newDate.toLocaleString('default', { day: '2-digit' });
//   const formatted = year + '-' + month + '-' + day;
//   const newEntry = {
//     quantity: singleStock.numshares - data.numshares,
//     soldFor: data.currentMarketValue,
//     date: formatted,
//   };
//   const temp = { ...user };

//   const match = temp.soldShares.find(
//     ({ stockSymbol }) => stockSymbol == data.stockSymbol
//   );
//   if (match) {
//     match.sales.push(newEntry);
//   } else {
//     temp.soldShares.push({
//       stockSymbol: data.stockSymbol,
//       sales: [{ ...newEntry }],
//     });
//   }
//   setUser(temp);
// };

// data.currentMarketValue = 100;
// const match = temp.shareValues.find(
//   ({ stockSymbol }) => stockSymbol == data.stockSymbol
// );
// if (match) {
//   data.averagePricePaid = Math.round(
//     (match.averagePricePaid * match.numshares +
//       data.currentMarketValue * data.numshares) /
//       (data.numshares + match.numshares)
//   );
//   data.numshares += match.numshares;
//   const index = temp.shareValues.indexOf(match);
//   temp.shareValues[index] = data;
//   setUser(temp);
// }

// data.currentMarketValue = 100;
// const match = temp.shareValues.find(
//   ({ stockSymbol }) => stockSymbol == data.stockSymbol
// );
// if (match) {
//   data.averagePricePaid = Math.round(
//     (match.averagePricePaid * match.numshares +
//       data.currentMarketValue * data.numshares) /
//       (data.numshares + match.numshares)
//   );
//   data.numshares += match.numshares;
//   const index = temp.shareValues.indexOf(match);
//   temp.shareValues[index] = data;
//   setUser(temp);
// } else {
//   data.averagePricePaid = data.currentMarketValue;
//   temp.shareValues.push(data);
//   setUser(temp);
// }
