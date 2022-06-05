export function currencyMultiplier(cookie, exchangeArray){
    let currencyObject = exchangeArray.filter(item => item.name === cookie.userCurrency)
    return {
        rate: currencyObject[0].rate,
        symbol: currencyObject[0].symbol
    }
}