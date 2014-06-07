/**
 * A arena.resource.Pool
 * @class
 */
arena.resource.Pool = function Pool() {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.resources = {};
	this.downloads = {};
};

/** define arena.resource.Pool instance methods */
arena.resource.Pool.prototype = {
	/** declares a url required and returns a resource
	 * @param {string|object} url a string or url object
	 * @returns arena.resource.Resource associated with url
	 */
	resource: function(url) {
		// convert to url object if passed string url
		if (typeof url == "string")
			url = new arena.resource.Url(url);

		// @returns arena.resource.Resource subclass
		if (this.resources[url.toString()]) {
			// return cached resource
			this.downloads[url.toString()] = this.resources[url.toString()];
			return this.resources[url.toString()];
		} else {
			// create new one, add to cache, return it
			var resource = new arena.resource[url.resourceClassName()](url);
			resource.pool = this;
			this.resources[url.toString()] = resource;
			this.downloads[url.toString()] = this.resources[url.toString()];
			resource.addEvent(arena.resource.READY, this.resourceReady.context(this));
			return resource;
		}
	},

	download: function() {
		this.dispatchEvent(arena.resource.DOWNLOADING);
		for (var url in this.downloads)
			this.downloads[url].download();
	},

	downloadsCount: function() {
		var c = 0;
		for (var key in this.downloads) c++;
		return c;
	},

	resourceReady: function(resource) {
		console.log("reasource ready " + resource.url.toString());
		delete this.downloads[resource.url.toString()];
		if (this.downloadsCount() == 0)
			this.dispatchEvent(arena.resource.READY);
	}
};

/***************************
 * arena.resource.Pool *
 ***************************/
arena.resource.Pool.toClass(
	/*domainName*/ 'arena.resource.Pool',
	/*superClass*/ arena.Object,
	/*instance.properties*/ []
);