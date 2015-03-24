
var REQUEST = function () {
    var request; //pseudo-global shared request object
    var SUCCESS = 200;
    var GET = "GET";
    var ASYNC = true;
    var STATES = {"UNSENT": 0, "OPENED": 1, "HEADERS_RECEIVED": 2, "LOADING": 3, "DONE": 4};
    var MESSAGES = [
        "0 UNSENT: open(), has not been called yet.",
        "1 OPENED: send(), has not been called yet.",
        "2 HEADERS_RECEIVED: send(), has been called, and headers and status are available.",
        "3 LOADING: Downloading;, responseText holds partial data.",
        "4 DONE: Complete, The operation is complete."
    ];

    function handleReadyStateChange(event) {
        console.log(MESSAGES[event.target.readyState]);
        if ((request.readyState == STATES.DONE) && (request.status == SUCCESS)) {
            self.callback.apply(self, [JSON.parse(request.responseText)]);
        }
    }

    function getJSON(url, callback) {
        request = new XMLHttpRequest();
        self.callback = callback;
        request.onreadystatechange = handleReadyStateChange;
        request.open(GET, url, ASYNC);
        request.send();
    }

    return {
        getJSON: getJSON
    };
}();