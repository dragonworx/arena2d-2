Object.prototype.className = null;

Javascript.classes = {};
Javascript.hashes = {};

Javascript.hash = function(object) {
	Javascript.hashes[object.className] = Javascript.hashes[object.className]
		? Javascript.hashes[object.className] + 1
		: 1;
	Object.defineProperty(object, 'hash', {
		value: object.className + "#" + (object.constructor.temp ? Javascript.hashes[object.className] == 1 ? 'temp' : Javascript.hashes[object.className] - 1 : Javascript.hashes[object.className]),
		enumerable: false,
		configurable: false
	});
	return object['hash'];
};

Javascript.classInit = function() {
	for (var domainName in Javascript.classes)
		if (Javascript.classes[domainName].init)
			Javascript.classes[domainName].init.call(Javascript.classes[domainName]);
};

Function.prototype.domainName = null;

Object.defineProperty(Object.prototype, 'className', {
	get: function() {
		if (this.constructor.domainName)
			return this.constructor.domainName;
		if (typeof this == 'function') {
			return this.functionName;
		} else {
			return this.constructor.functionName;
		}
	},
	configurable: false,
	enumerable: false
});

/**
 * Creates a concrete class with the given properties
 * @param {string} domainName A fully qualified domain name for this class
 * @param {Function} superClass The super class, if none required use arena.Object
 * @param {Array} properties An array of instance-side property names
 * @returns {Function}
 */
Function.prototype.toClass = function(domainName, superClass, properties) {
	Javascript.classes[domainName] = this;

	/** @static
	 *  @property domainName  */
	Object.defineProperty(this, 'domainName', {
		value: domainName,
		enumerable: false,
		configurable: false
	});

	/** explicitly assign constructor */
	this.prototype.constructor = this;

	/** @property superConstructor  */
	Object.defineProperty(this.prototype, 'superConstructor', {
		value: superClass,
		enumerable: false,
		configurable: false
	});

	/** @static
	 *  @property superConstructor  */
	Object.defineProperty(this, 'superConstructor', {
		value: superClass,
		enumerable: false,
		configurable: false
	});

	/** inherit superClass if given **/
	if (typeof superClass == "function") {
		/** copy prototype */
		var proto = {};
		for (var key in this.prototype)
			proto[key] = this.prototype[key];
		/** copy all superClass prototype methods if not present in this prototype */
		for (var key in superClass.prototype)
			this.prototype[key] = superClass.prototype[key];
		/** restore prototype */
		for (var key in proto)
			this.prototype[key] = proto[key];
		/** insert all superClass instance property names into my instance names */
		this.property.insertAll(superClass.property);
	}

	/** add all the given instance properties to class list */
	this.property.addAll(properties);
	this.properties = properties;

	/** create each instance properties */
	this.property.each(function(name) {
		this.createInstanceAccessors(name);
	}, this);

	/** return the class */
	return this;
};

/**
 * create a standard GETTER and SETTER (and hidden actual property value) for the given property name
 * @param name
 */
Function.prototype.createInstanceAccessors = function(name) {
	/** @property actual value for property */
	var realPropertyName = '_' + name;

	var getter = function() {
		/** @property getter ----------- */
		return this[realPropertyName];
	};

	var setter = function(value) {
		/** @property setter ----------- */
		var oldValue = this[realPropertyName];
		this[realPropertyName] = value;
		this.dispatchEvent(this.propertyEvent(name), this[name], oldValue)
		this.dispatchEvent(arena.Object.CHANGED, name);
	};

	/** bind to object */
	Object.defineProperty(this.prototype, name, {
		get: getter,
		set: setter
	});

	return this;
};

Function.prototype.property = null;

Object.defineProperty(Function.prototype, 'property', {
	get: function() {
		if (!this._property)
			this._property = [];
		return this._property;
	}
});

Function.prototype.temporary = function() {
	// create a static temp class-side
	this.temp = true;
	this.temp = new this();
	// create an instance method which returns the temp cloned from self
	Object.defineProperty(this.prototype, 'temp', {
		get: function() { return this.constructor.temp.clone(this); }
	});
};

Array.temporary();

Javascript.classAssert = function() {
	console.group('Class Asserts');
	for (var domainName in Javascript.classes)
		if (Javascript.classes[domainName].assert)
			Javascript.classes[domainName].assert.call(Javascript.classes[domainName]);
	console.groupEnd();
};

jQuery(document).ready(function() {
	Javascript.classInit();
});