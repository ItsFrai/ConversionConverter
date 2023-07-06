async function fetchExchangeRates(baseCurrency) {
  const apiKey = '4dccf5d1358a90b6d5b14b24'; // 
  const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseCurrency}`);
  const data = await response.json();
  return data.conversion_rates;
}
  
function convertCurrency(amount, fromCurrency, toCurrency, rates) {
    const baseAmount = amount / rates[fromCurrency];
    const convertedAmount = baseAmount * rates[toCurrency];
    return convertedAmount.toFixed(2);
  }
  
async function currencyConverter() {
    const baseCurrencyInput = document.getElementById('baseCurrency');
    const amountInput = document.getElementById('amount');
    const targetCurrencyInput = document.getElementById('targetCurrency');
    const resultDiv = document.getElementById('result');
  
    const baseCurrency = baseCurrencyInput.value.toUpperCase();
    const amount = parseFloat(amountInput.value);
  
    const rates = await fetchExchangeRates(baseCurrency);
    if (!rates) {
      resultDiv.textContent = 'Failed to fetch exchange rates.';
      return;
    }
  
    const targetCurrency = targetCurrencyInput.value.toUpperCase();
    const convertedAmount = convertCurrency(amount, baseCurrency, targetCurrency, rates);
  
    resultDiv.textContent = `${amount} ${baseCurrency} = ${convertedAmount} ${targetCurrency}`;
  }
  
const convertButton = document.getElementById('convertButton');
convertButton.addEventListener('click', currencyConverter);
  


