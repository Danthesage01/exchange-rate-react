function CurrencyEntry({
  currencyOptions,
  selectedCurrency,
  handleChangeCurrency,
  amount,
  handleChangeAmount,
}) 
{

  return (
    <div className="container">
      <div className="currency">
        <select
          value={selectedCurrency}
          onChange={handleChangeCurrency}
        >
          {currencyOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label htmlFor="number"></label>
        <input type="number" id="number" value={amount} onChange={handleChangeAmount} />
      </div>
    </div>
  );
}

export default CurrencyEntry;
