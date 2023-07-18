export function deviceCallback(callback, req) {
    window.webkit.messageHandlers.MyHandler.postMessage(callback, req);
}