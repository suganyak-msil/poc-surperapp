// import { getsymbols } from "../actions/watchlistAction";
// import { useDispatch } from "react-redux";
// const dispatch = useDispatch();
class DeviceIdentifier {
    constructor() {
        this._userAgent = navigator.userAgent || "";
        this._platform = navigator.platform || "";
    }

    get isAndroid() {
        return /android/i.test(this._userAgent);
    }

    get isIos() {
        return /iPad|iPhone|iPod/.test(this._platform);
    }

    get isMobile() {
        return /android|iphone|kindle|ipad/i.test(this._userAgent);
    }

    get isDesktop() {
        return !this.isMobile
    }
}
let deviceIdentifier = new DeviceIdentifier();

let iosInterface = (window.webkit ? window.webkit.messageHandlers : {});
const __internalWindow = window;
var AndroidInterface = __internalWindow['Android'] ? __internalWindow['Android'] : {};

export function sendGetGroupsRequest() {
    console.log(deviceIdentifier.isIos)
    if (deviceIdentifier.isIos) {
        console.log('entered')
        iosInterface.sendGetGroupsRequest && iosInterface.sendGetGroupsRequest.postMessage("");
        // intializeGlobalVariable()
    } else if (deviceIdentifier.isAndroid) {
        console.log('entered android')
        AndroidInterface.sendGetGroupsRequest && AndroidInterface.sendGetGroupsRequest("");
    }
    return true;
}


// export function getHeaderGroupsResponse(response) {
//     if (!window.hasOwnProperty('getGroupsResponse')) {
//         Object.defineProperty(window, 'getGroupsResponse', {
//             value: (response) => {
//                 console.log("getGroupsResponse function called in web ", response);
//                 return JSON.parse(response);
//             },
//             writable: false,
//         });
//     }

// }
export function getWatchListSymbolData(req) {
    if (deviceIdentifier.isIos) {
        console.log('entered')
        iosInterface.sendGetSymbolsRequest && iosInterface.sendGetSymbolsRequest.postMessage(req);

        // intializeGlobalVariable()
    } else if (deviceIdentifier.isAndroid) {
        console.log('entered android')
        AndroidInterface.sendGetSymbolsRequest && AndroidInterface.sendGetSymbolsRequest(req);
    }
    // getwatchListResponse()
}

export function getwatchListSymbolsResponse(response) {
    if (!window.hasOwnProperty('getWatchListSymbolsResponse')) {
        Object.defineProperty(window, 'getWatchListSymbolsResponse', {
            value: (response) => {
                console.log("getGroupsResponse function called in web ", response);
                return JSON.parse(response);
            },
            writable: false,
        });
    }
    // console.log('getwatchListResponse ', response);
    // return response
}

export function searchwatchListSymbolsRequest(req) {
    if (deviceIdentifier.isIos) {
        console.log('entered')
        iosInterface.sendSearchSymbolsRequest && iosInterface.sendSearchSymbolsRequest.postMessage(req);
    } else if (deviceIdentifier.isAndroid) {
        console.log('entered android')
        AndroidInterface.sendSearchSymbolsRequest && AndroidInterface.sendSearchSymbolsRequest(req);
    }
}