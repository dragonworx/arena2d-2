/**
 * A arena.resource.Audio
 * @class
 */
arena.resource.Audio = function Audio(url) {
	/** call super constructor */
	arena.resource.Resource.call(this, url);

	/** set default properties */
	this.audio = jQuery('<audio/>');
	this.isPlaying = false;
};

/** define arena.resource.Audio instance methods */
arena.resource.Audio.prototype = {
	activateDownload: function() {
		arena.dom.bind(this.audio, arena.resource.AUDIO_LOADED, this.onAudioLoaded.context(this));
		arena.dom.bind(this.audio, arena.resource.AUDIO_TIME_UPDATE, this.onAudioTimeUpdate.context(this));
		this.audio.append('<source src="%1" type="%2" />'.args(this.url.toString(), arena.resource.AUDIO_TYPES[this.url.extension]));
		this.audio.load();
	},

	onAudioLoaded: function() {
		arena.dom.unbind(this.audio, arena.resource.AUDIO_LOADED, this.onAudioLoaded.context(this));
		this.loaded = true;
		this.dispatchEvent(arena.resource.READY, this);
	},

	onAudioTimeUpdate: function() {
		//console.log(this.progress());
	},

	resource: function() {
		return this.audio;
	},

	play: function() {
		if (this.audio.element.readyState != 4) {
			console.log('Cannot play ' + this.toString());
			return;
		}
		if (this.isPlaying)
			this.stop();
		this.audio.element.play();
		this.isPlaying = true;
		return this;
	},

	pause: function() {
		this.audio.element.pause();
		this.isPlaying = false;
		return this;
	},

	stop: function() {
		this.audio.element.pause();
		this.audio.element.currentTime = 0;
		this.isPlaying = false;
		return this;
	},

	rewind: function() {
		this.stop();
		this.play();
	},

	progress: function() {
		return this.audio.element.currentTime / this.audio.element.duration;
	},

	readyState: function() {
		return arena.resource.READY_STATE[this.audio.element.readyState];
	},

	networkState: function() {
		return arena.resource.NETWORK_STATE[this.audio.element.networkState];
	},

	toString: function() {
		return 'audio(%1, %2, %3)'.args(this.url.toString(), this.readyState(), this.networkState());
	}
};

/***************************
 * arena.resource.Audio *
 ***************************/
arena.resource.Audio.toClass(
	/*domainName*/ 'arena.resource.Audio',
	/*superClass*/ arena.resource.Resource,
	/*instance.properties*/ ['audio']
);