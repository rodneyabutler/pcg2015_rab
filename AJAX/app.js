// Requires request.js
var MY_APP = function () {
    self.displayElement = undefined;
    var ONE_SECOND = 1000; //in milliseconds
    function updateView(data) {
        var lineBreak = "<br>";
        self.displayElement.innerHTML = [
            data["date"],
            data["time"],
            data["milliseconds_since_epoch"]
        ].join(lineBreak);
        window.setTimeout(updateTimeFromServer, ONE_SECOND);
    }

    function updateTimeFromServer(elementName) {
        self.displayElement = document.getElementById("display");
        var URL_TIME = "http://date.jsontest.com/";
        REQUEST.getJSON(URL_TIME, updateView);
    }

    return {
        updateTimeFromServer: updateTimeFromServer
    }
}();