// String extensions
String.fill = function(length, str) { var output = ''; for (var i=0; i<length; i++) output += str; return output; };
String.prototype.startsWith = function(substring) { return this.indexOf(substring) == 0; };
String.prototype.endsWith = function(substring) { return this.indexOf(substring) == this.length - substring.length; };
String.prototype.contains = function(substring) { return this.indexOf(substring) > -1; };
String.prototype.capitalise = function() { if ((this.charCodeAt(0) >= 97) && (this.charCodeAt(0) <= 122)) return String.fromCharCode(this.charCodeAt(0) - 32) + this.substring(1); };
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };
String.prototype.trimLeft = function() { return this.replace(/^\s+/g, ''); };
String.prototype.trimRight = function() { return this.replace(/\s+$/g, ''); };
String.prototype.args = function() { var output = this; for (var i=0; i<arguments.length; i++) output = output.replace("%" + (i + 1), arguments[i]); return output.toString(); };
String.prototype.padLeft = function(str, length) { var output = this; while (output.length < length) output = str + output; return output.toString(); };
String.prototype.padRight = function(str, length) { var output = this; while (output.length < length) output = output + str; return output.toString(); };
String.prototype.repeat = function(length) { return String.fill(length, this); };
String.prototype.remove = function(substring) { return this.replace(substring, ''); };
String.prototype.chopLeft = function(delim, length) { return this.split(delim).chopLeft(length).join(delim); };
String.prototype.chopRight = function(delim, length) { return this.split(delim).chopRight(length).join(delim); };
String.prototype.toInt = function() { return parseInt(this); };
String.prototype.toFloat = function() { return parseFloat(this); };
String.prototype.equals = function(str, caseSensitive) { return caseSensitive ? this == str.toString() : this.toLowerCase() == str.toString().toLowerCase(); };

// Number extensions
Number.prototype.decimals = function(places) { return Math.round(this * Math.pow(10, places)) / Math.pow(10, places); };