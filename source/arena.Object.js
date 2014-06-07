/**
 * @fileOverview The file defines the arena.Object class.
 * @author Ali Chamas 2012
 * @version 3.0.0
 */

/**
 * Create a new arena.Object object
 * @class The abstract super class for all classes in arena
 * @property {int} hash The unique assigned hash for this object
 * @property {object} events The event listeners of this object
 */
arena.Object = function Object() {
	Javascript.hash(this);

	window.Object.defineProperty(this, 'events', {
			value: {},
			configurable: false,
			enumerable: false}
	);
};

arena.Object.prototype = {
	events: undefined,
	/**
	 * return a shallow copy of this object
	 * @returns {object} the newly created object
	 */
	copy: function() {
		var obj = new this.constructor();
		obj.clone(this);
		return obj;
	},

	/**
	 * shallow clone the given object (assumes objects are of same type)
	 * @param {object} obj The object to clone
	 * @returns {object} this object
	 */
	clone: function(obj) {
		this.constructor.property.each(function(propName) {
			this[propName] = obj[propName];
		}, this);
		return this;
	},

	/**
	 * return true or false to whether this object equals the given object (uses class property descriptions and whether the objects respond to equals or just equality operator)
	 * @param {object} obj The object to test for equality (assumes objects are of same type)
	 * @returns {boolean} whether or not this object equals the given
	 */
	equals: function(obj) {
		var result = this.constructor.property.each(function(propName) {
			if (this[propName].equals && !this[propName].equals(obj[propName]))
				return false;
			else
			if (this[propName] != obj[propName])
				return false;
		}, this);
		return result != false;
	},

	/**
	 * add a listener for the given event name
	 * @param {string} eventName The event name to listen on
	 * @param {function} fn The event handler function to respond to
	 * @param {object} scope The 'this' context given to the function when called
	 * @returns {object} this object
	 */
	addEvent: function(eventName, fn, scope) {
		if (!this.events[eventName])
			this.events[eventName] = {enabled: true, handlers: [], oldValue: undefined};
		this.events[eventName].handlers.add({fn: fn, scope: scope || window});
		return this;
	},

	/**
	 * remove the listener function from the named event
	 * @param {string} eventName The event name which the listener function is attached to
	 * @param {function} fn the listener function to detach from the event
	 * @returns {object} this object
	 */
	removeEvent: function(eventName, fn) {
		this.events[eventName].handlers.each(function(eventHandler, index) {
			if (eventHandler.fn == fn)
				this.events[eventName].handlers[index] = undefined;
		}, this);
		this.events[eventName].handlers.compact();
		return this;
	},

	/**
	 * send the given event with the given data
	 * @param {string} eventName The event to fire
	 * @param {*} args any object for data, can be arbitrary amount of arguments after the eventName
	 * @returns {object} this object
	 */
	dispatchEvent: function() {
		var args = argsArray(arguments);
		var eventName = args.takeFirst(String);
		if (!this.events[eventName])
			return this;
		if (this.events[eventName].enabled) {
			for (var i=0; i<this.events[eventName].handlers.length; i++) {
				var eventHandler = this.events[eventName].handlers[i];
				eventHandler.fn.apply(eventHandler.scope, args);
			}
		}
		return this;
	},

	/**
	 * returns the event name for the given property name
	 * @param {string} propName The property name
	 * @returns {string} the event name for the given property
	 */
	propertyEvent: function(propName) {
		return propName + 'Changed';
	},

	/**
	 * returns the property name for the given event name
	 * @param {string} eventName The event name
	 * @returns {string} the property name for the given event
	 */
	eventProperty: function(eventName) {
		return eventName.replace('Changed', '');
	},

	/**
	 * @param {string} eventName The event name to disable. Will cache the current value to use as old value when the event is re-enabled and dispatched
	 * @returns {object} this object
	 */
	disableEvent: function() {
		argsArray(arguments).each(function(eventName) {
			this.events[eventName].enabled = false;
			this.events[eventName].cachedValue = this[this.eventProperty(eventName)];
		}, this);
		return this;
	},

	/**
	 * @param {string} eventName The event name to enable. Will dispatch the event and pass through the changes
	 * @returns {object} this object
	 */
	enableEvent: function() {
		argsArray(arguments).each(function(eventName) {
			this.events[eventName].enabled = true;
			for (var i=0; i<this.events[eventName].handlers.length; i++) {
				var eventHandler = this.events[eventName].handlers[i];
				eventHandler.fn.call(eventHandler.scope, this[this.eventProperty(eventName)], this.events[eventName].cachedValue);
			}
		}, this);
		return this;
	},
	enableEvents: function() {
		this.enableEvent.apply(this, this.constructor.properties);
	},
	disableEvents: function() {
		this.disableEvent.apply(this, this.constructor.properties);
	}
};

/**
 * @static
 */
arena.Object.CHANGED = 'changed';

/**
 * build and publish arena.Object as class into global namespace
 */
arena.Object.toClass(
	'arena.Object',
	undefined,
	[]
);