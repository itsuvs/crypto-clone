import _ from 'lodash'

const initialState = {
    cryptoArray: [],
    fiatCurrencyArray: [],
    marketDataArray: [],
    tickerArray: [],
    loadingDone: false,
}

const rootReducer = (state= initialState, action) => {
    
    switch (action.type) {
        case "ADD_FETCHED_CRYPTO_DATA":
            return {...state, cryptoArray: [...action.payload]}
        case "ADD_FETCHED_FIAT_DATA":
            return {...state, fiatCurrencyArray: [...action.payload]}
        case "ADD_MARKET_DATA":
            return {...state, marketDataArray: [...action.payload]}
        case "GENERATE_TICKER_ARRAY":
            return {...state, tickerArray: [...action.payload]}
        case "LOADING_DONE":
            return {...state, loadingDone: true}
        case "SORT_BY_HIGH_TO_LOW":
            let sortedArrayByAsc = _.orderBy(state.cryptoArray, (o) => +o.price, ["asc"]);
            return {...state, cryptoArray: sortedArrayByAsc}
        case "SORT_BY_LOW_TO_HIGH":
            let sortedArrayByDesc = _.orderBy(state.cryptoArray, (o) => +o.price, ["desc"]);
            return {...state, cryptoArray: sortedArrayByDesc}
        default:
            return state
    }
}

export default rootReducer