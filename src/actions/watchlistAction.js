const GET_SYMBOLS = 'GET_SYMBOLS';
const STORE_WATCHLIST = 'STORE_WATCHLIST';


export function getsymbolslist(data) {
    console.log("inside action ", data);
    return {
        type: GET_SYMBOLS,
        payload: data
    }
}
export function storewatchlistHeaders(data) {
    return {
        type: STORE_WATCHLIST,
        payload: data
    }
}
