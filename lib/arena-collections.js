/** ! arena v1.7.1 arena2d.com | arena2d.com/license */

/** clear the array */
Array.prototype.clear = function() {
	this.length = 0;
	return this;
};

/**  */
Array.prototype.clone = function(array, deepCopy) {
	this.clear();
	for (var i = 0; i < array.length; i++)
		this.push(deepCopy && array[i].copy ? array[i].copy() : array[i]);
	return this;
};

/**  */
Array.prototype.copy = function() {
	return [].slice.call(this);
};

/**  */
Array.prototype.deepCopy = function() {
	var array = [];
	for (var i = 0; i < this.length; i++)
		array.push(this[i].copy ? this[i].copy() : this[i]);
	return array;
};

/**  */
Array.prototype.equals = function(array) {
	if (array.length != this.length)
		return false;
	for (var i = 0; i < this.length; i++)
		if (this[i].equals ? !(this[i].equals(array[i])) : this[i] != array[i])
			return false;
	return true;
};

/**  */
Array.prototype.add = function(item) {
	this.push(item);
	return this;
};

/**  */
Array.prototype.addAll = function(array) {
	this.push.apply(this, array);
	return this;
};

/**  */
Array.prototype.insertAll = function(array) {
	this.unshift.apply(this, array);
	return this;
};

/**  */
Array.prototype.addLast = function(item) { return this.insertAt(item, this.length); };

/**  */
Array.prototype.insert = function(item) {
	this.splice(0, 0, item);
	return this;
};

/**  */
Array.prototype.insertAt = function(item, index) {
	this.splice(index, 0, item);
	return this;
};

/**  */
Array.prototype.first = function() { return this[0]; };

/**  */
Array.prototype.last = function() { return this[this.lastIndex]; };

/**  */
Array.prototype.contains = function(item) { return this.indexOf(item) > -1; };

/**  */
Array.prototype.insertBefore = function(newItem, beforeItem) {
	this.insertAt(this.indexOf(beforeItem), newItem);
	return this;
};

/**  */
Array.prototype.insertAfter = function(newItem, afterItem) {
	this.insertAt(this.indexOf(afterItem) + 1, newItem);
	return this;
};

/**  */
Array.prototype.chopLeft = function(length) { return this.slice(length); };

/**  */
Array.prototype.chopRight = function(length) { return this.slice(0, this.length - length); };

/**  */
Array.prototype.copyRange = function(startIndex, length) { return this.splice(startIndex, length); };

/**  */
Array.prototype.remove = function(item) {
	for (var i = 0; i < this.length; i++)
		if (this[i] == item)
			this.removeAt(i);
	return item;
};

/**  */
Array.prototype.removeAt = function(index) {
	this.splice(index, 1);
	return this;
};

/**  */
Array.prototype.removeAnyFrom = function(array) {
	for (var i = 0; i < array.length; i++)
		for (var j = 0; j < this.length; j++)
			if (this[j] == array[i])
				this[j] = undefined;
	this.compact();
	return this;
};

/**  */
Array.prototype.removeDuplicates = function() {
	for (var i = 0; i < this.length; i++)
		for (var j = 0; j < this.length; j++)
			if ((this[j] == this[i]) && (i != j))
				this[j] = undefined;
	this.compact();
	return this;

};

/**  */
Array.prototype.compact = function() {
	var array = Array.temp.clear();
	for (var i = 0; i < this.length; i++)
		if (this[i] != undefined)
			array.push(this[i]);
	this.clear();
	for (var j = 0; j < array.length; j++)
		this.push(array[j]);
	return this;
};

/**  */
Array.prototype.removeFirst = Array.prototype.shift;

/**  */
Array.prototype.removeLast = Array.prototype.pop;

/**  */
Array.prototype.update = function(callback) {
	for (var i = 0; i < this.length; i++)
		this[i] = callback(this[i], i);
	return this;
};

/**  */
Array.prototype.fill = function(type, count) {
	for (var i = 0; i < count; i++)
		this.push(new type());
	return this;
};

Array.prototype.clearFilled = function() {
	for (var i = 0; i < this.length; i++)
		this[i].clear();
};

Array.prototype.isFillEmpty = function() {
	for (var i = 0; i < this.length; i++)
		if (!this[i].isEmpty)
			return false;
	return true;
};

Array.prototype.reverse = function() {
	var array = Array.temp.clear();
	for (var i = this.length - 1; i >= 0; i--)
		array.push(this[i]);
	this.clear();
	this.addAll(array);
	return this;
};

Array.prototype.toArray = function() {
	var array = [];
	array.push.apply(array, this);
	return array;
};

Array.prototype.takeFirst = function(type) {
	if (this.length == 0)
		return undefined;
	var typeString = typeof(type).toString().toLowerCase();
	for (var i = 0; i < this.length; i++) {
		if ((type == Object) && (typeof(this[i] == "object")) && !(this[i] instanceof Array)) return this.remove(this[i]);
		if ((type == Array) && (this[i] instanceof Array)) return this.remove(this[i]);
		if (typeof(this[i]) == typeString) return this.remove(this[i]);
	}
};

Array.prototype.takeLast = function(type) {
	if (this.length == 0) return undefined;
	var typeString = typeof(type).toString().toLowerCase();
	for (var i = this.length - 1; i >= 0; i++) {
		if ((type == Object) && (typeof(this[i] == "object")) && !(this[i] instanceof Array)) return this.remove(this[i]);
		if ((type == Array) && (this[i] instanceof Array)) return this.remove(this[i]);
		if (typeof(this[i]) == typeString) return this.remove(this[i]);
	}
};

Array.from = function() {
	var array = [];
	array.push.apply(array, arguments);
	return array;
};

Array.tempFrom = function() {
	Array.temp.push.apply(Array.temp, arguments);
	return Array.temp;
};

Object.defineProperty(Array.prototype, 'lastIndex', {
	get: function() { return this.length - 1; },
	configurable: false,
	enumerable: false
});

Object.defineProperty(Array.prototype, 'isEmpty', {
	get: function() {
		if (this instanceof Array) return this.length == 0;
		for (var key in this) return false;
		return true;
	},
	configurable: false,
	enumerable: false
});

window.argsArray = function(args) {
	return [].slice.call(args);
};

// Object literal (dictionary/hashes)
Object.defineProperty(Object.prototype, 'containsKey', {
	value: function(key) {
		return isDefined(this[key]);
	},
	configurable: false,
	enumerable: false
});

Object.clear = function(object) {
	if (this instanceof Array) {
		object.clear();
	} else {
		var keys = Object.keys(object);
		for (var key in keys)
			delete object[key];
	}
	return object;
};

Object.select = function(obj, callback) {
	var results = {};
	Object.select.func(obj, callback, results);
	return results;
};

Object.select.func = function(obj, callback, results) {
	var keys = Object.keys(obj);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		if (typeof obj[key] == 'object') {
			Object.select.func(obj[key], callback, results);
		} else {
			if (callback(key, obj[key])) {
				results[key] = obj[key];
			}
		}
	}
};

function isObjectNotArray(obj) {
	return (typeof obj == "object") && !(obj instanceof Array);
}

Object.values = function(obj) {
	var array = [];
	Object.keys(obj).each(function(e) {
		array.push(e);
	});
	return array;
};

Object.defineProperty(Object.prototype, 'each', {
	value: function(fn, thisContext) {
		var result;
		if (this instanceof Array) {
			for (var i=0; i<this.length; i++) {
				result = fn.call(thisContext || this, this[i], i);
				if (isDefined(result))
					return result;
			}
		} else {
			for (var key in this) {
				result = fn.call(thisContext || this, key, this[key]);
				if (isDefined(result))
					return result;
			}
		}
	},
	enumerable: false,
	configurable: false
});