import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CurrencyEntry from "./components/CurrencyEntry"
import { FaArrowDown } from "react-icons/fa";


function App() {
  const BASE_URL = "https://api.exchangerate.host/latest"

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, 
      fromAmount

  if(amountInFromCurrency){
    fromAmount = amount
    toAmount = (amount * exchangeRate).toFixed(2)
  }else{
    toAmount = amount
    fromAmount = (amount / exchangeRate).toFixed(2)
  }

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[104]
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        setToCurrency(firstCurrency)
        setExchangeRate(data.rates[firstCurrency])
      })
  }, [])

  useEffect(()=>{
  if(fromCurrency != null && toCurrency != null){
fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
.then(res=>res.json())
.then(data=> setExchangeRate(data.rates[toCurrency]))
}
}, [fromCurrency, toCurrency])



function handleFromChangeAmount(e){
  setAmount(e.target.value)
  setAmountInFromCurrency(true)
}
function handleToChangeAmount(e){
  setAmount(e.target.value)
  setAmountInFromCurrency(false)
}
  //  
  return (
    <div className="container">
      <Header />
      <CurrencyEntry
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        handleChangeCurrency={(e) => setFromCurrency(e.target.value)}
        amount={fromAmount}
        handleChangeAmount={handleFromChangeAmount}
      />
      <div className="swap-rate-container">
       <FaArrowDown size={40} color="#5FBAA7"/>
        <div className="rate" id="rate"></div>
      </div>
      <CurrencyEntry
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        handleChangeCurrency={(e) => setToCurrency(e.target.value)}
        amount={toAmount}
        handleChangeAmount={handleToChangeAmount}
      />

    </div>
  )
}

export default App;
