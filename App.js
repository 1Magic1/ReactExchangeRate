import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF', 'PLN', 'KZT','TRY'], // Обрані валюти
      rates: {}, // Об'єкт для зберігання курсу валют
      selectedCurrency: 'USD',
      
    };
    // Збереження назви валют
    this.currencyNames = {
      'USD': 'долар США',
      'EUR': 'євро',
      'GBP': 'британський фунт',
      'CAD': 'канадський долар',
      'AUD': 'австралійський долар',
      'JPY': 'японська єна',
      'CHF': 'швейцарський франк',
      'PLN': 'польський злотий',
      'KZT': 'казахстанский тенге',
      'TRY': 'турецька ліра',
    };
  }

  componentDidMount() {
    this.fetchRates(this.state.selectedCurrency);
  }

  // Метод для отримання курсу валют з API
  fetchRates(currency) {
    axios
      .get(`https://api.exchangerate-api.com/v4/latest/${currency}`)
      .then((response) => {
        this.setState({ rates: response.data.rates });
      })
      .catch((error) => {
        console.error('Error fetching the rates', error);
      });
  }

  // Метод для обробки зміни обраної валюти
  handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    this.setState({ selectedCurrency });
    this.fetchRates(selectedCurrency);
  };

  render() {
    const { currencies, rates, selectedCurrency } = this.state;

    return (
      <div className="app-container">
        <h1>Актуальний курс валют к гривні</h1>
        {/* Випадаючий список для вибору валюти */}
        <select onChange={this.handleCurrencyChange} value={selectedCurrency} className="currency-selector">
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {this.currencyNames[currency]} ({currency})
            </option>
          ))}
        </select>
        {/* Відображення курсу обраної валюти до гривні */}
        <div className="rates">
          {rates.UAH ? (
            <p className="rate-value">
            1 {this.currencyNames[selectedCurrency]} = {rates.UAH.toFixed(2)} українських гривень
            </p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
