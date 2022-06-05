export function checkUserCurrency(cookie, setCookie){
    return new Promise((resolve, reject) => {
        if (cookie.useCurrency === undefined){
            setCookie('userCurrency', 'INR', {path: '/'})
        }
        resolve({status:'success'})
    })
}