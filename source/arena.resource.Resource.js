/**
 * A arena.resource.Resource is abstract and my be subclassed, plus they are only created by the arena.resource.Pool who creates them
 * @class
 */
arena.resource.Resource = function Resource(url) {
	/** call super constructor */
	arena.Object.call(this);

	/** set default properties */
	this.url = url;
	this.loaded = false;

	// @property {string} type subclasses should override this
	this.type = arena.resource.RESOURCE;
};

/** define arena.resource.Resource instance methods */
arena.resource.Resource.prototype = {
	download: function() {
		this.dispatchEvent(arena.resource.DOWNLOADING, this);
		console.log("resource downloading " + this.url.toString());
		if (this.loaded)
			this.dispatchEvent(arena.resource.READY, this);
		else
			this.activateDownload();
	},
	activateDownload: function() {
		/** subclasses override actual specifics of initiating download, but here's where it's started */
		// instigate media/resource transfer to client
	},
	resource: function() {
		/** subclasses returns actual resource/media */
	}
};

/***************************
 * arena.resource.Resource *
 ***************************/
arena.resource.Resource.toClass(
	/*domainName*/ 'arena.resource.Resource',
	/*superClass*/ arena.Object,
	/*instance.properties*/ ['url', 'loaded', 'pool']
);