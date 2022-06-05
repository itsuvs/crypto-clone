import axios from 'axios' 
import _ from 'lodash'

export const addFetchedCryptoData = (payload) =>{
    return {
        type: 'ADD_FETCHED_CRYPTO_DATA',
        payload
    }
}

export const addFetchedFiatData = (payload) =>{
    return {
        type: 'ADD_FETCHED_FIAT_DATA',
        payload
    }
}

export const addMarketData = (payload) =>{
    return {
        type: 'ADD_MARKET_DATA',
        payload
    }
}

export const generateTickerArray = (payload) => {
    return {
        type: 'GENERATE_TICKER_ARRAY',
        payload
    }
}

export const loadingDone = () =>{
    return {
        type: 'LOADING_DONE'
    }
}

export const sortByHighToLow = (payload) => {
    return {
        type: 'SORT_BY_HIGH_TO_LOW'
    }
}

export const sortByLowToHigh = (payload) => {
    return {
        type: 'SORT_BY_LOW_TO_HIGH'
    }
}

// action creators

export const fetchCryptoData = () => (dispatch) => {
    return new Promise((resolve, reject) => {
    callCoinGlobalAvgPriceAPI()
    .then((apiResponse) => {
        let coinData = apiResponse.data.coins
        dispatch(addFetchedCryptoData(coinData))
        resolve({status: 'success'})
    })
    .catch(err =>{
        console.log('Error in the api')
        reject({status: 'failed'})
    })
    })
}

export const fetchFiatCurrencyData = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        callFiatCurrencyAPI()
        .then((apiResponse) =>{
            let fiatData = apiResponse.data
            dispatch(addFetchedFiatData(fiatData))
            resolve({status: 'success'})
        })
        .catch(err => {
            console.log('Error in the api')
            reject({status: 'failed'})
        })
    } )
}

export const fetchMarketData = (cryptoName) => (dispatch) => {
    return new Promise((resolve, reject) => {
        callMarketAPI(cryptoName)
        .then((apiResponse) => {
            let marketData = apiResponse.data
            dispatch(addMarketData(marketData))
            dispatch(loadingDone())
            resolve({data: marketData})
        })
        .catch(err => {
            console.log('Error in the api')
            reject({status: 'failed'})
        })
    })
}

// API services

const callCoinGlobalAvgPriceAPI = () => {
    return axios.get('https://api.coinstats.app/public/v1/coins?currency=USD')
}

const callFiatCurrencyAPI = () => {
    return axios.get('https://api.coinstats.app/public/v1/fiats')
}

const callMarketAPI = (cryptoName) => {
    return axios.get(`https://api.coinstats.app/public/v1/markets?coinId=${cryptoName}`)
}
  