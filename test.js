// rawHeaders.split(/\r?\n/) method has a bug in ie11
// Using finite state machine to solve ie11 parsing head problem
var responseChunkedParse = {
  receive: function(data) {
    //  the response header
    this.header = {};
    // The name of the response header
    this.name = '';
    // The value of the response header
    this.value = '';
    // State machine, each state is designed as a function
    this.handleStatus = this.foundHeaderName;
    // The data is fed to each state machine, and the data is parsed and stored
    for (var a = 0; a < data.length; a++) {
      this.handleStatus = this.handleStatus(data.charAt(a));
    }
    this.setHeaderData();
  },
  foundHeaderName: function(char) {
    // The name of the response header, such as content-type: application/x-www-form-urlencoded, and content-type is name
    if (char === ':') {
      return this.foundHeaderSpace;
    } else if (char === ' ' || char === '\r' || char === '\n') {
      return this.foundHeaderName;
    } else {
      this.name += char;
    }
    return this.foundHeaderName;
  },
  foundHeaderSpace: function(char) {
    // The space in the response header, such as content-type: application/x-www-form-urlencoded, ':' is followed by a space
    if (char === ' ') {
      return this.foundHeaderValue;
    }
    return this.foundHeaderSpace;
  },
  foundHeaderValue: function(char) {
    // The value of the response header, such as content-type: application/x-www-form-urlencoded，application/x-www-form-urlencoded is value
    if (char === '\r' || char === '\n') {
      // You need to filter out the '\r\n' between each item in the response header, such as content-type: application/x-www-form-urlencoded'\r\n'content-length:10
      this.setHeaderData();
      return this.foundHeaderName;
    } else {
      this.value += char;
    }
    return this.foundHeaderValue;
  },

  setHeaderData: function() {
    if (!this.name || !this.value) return;
    this.header[this.name.toLowerCase()] = this.value;
    this.name = '';
    this.value = '';
  },
}
var newHeaders = responseChunkedParse.receive(rawHeaders) || {};
return newHeaders;
