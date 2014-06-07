arena.resource = {
	// class types
	IMAGE: 'Image',
	AUDIO: 'Audio',
	RESOURCE: 'Resource',
	// events
	READY: 'resourceReady',
	DOWNLOADING: 'resourceDownloading',
	IMAGE_LOADED: 'load',
	AUDIO_LOADED: 'canplaythrough',
	AUDIO_TIME_UPDATE: 'timeupdate',
	// file types
	IMAGE_TYPES: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tif', 'tiff'],
	AUDIO_TYPES: {
		mp3: 'audio/mp3',
		wav: 'audio/x-wav',
		ogg: 'audio/ogg'
	},
	READY_STATE: {
		HAVE_NOTHING: 0,
		HAVE_METADATA: 1,
		HAVE_CURRENT_DATA: 2,
		HAVE_FUTURE_DATA: 3,
		HAVE_ENOUGH_DATA: 4,
		0: 'HAVE_NOTHING',
		1: 'HAVE_METADATA',
		2: 'HAVE_CURRENT_DATA',
		3: 'HAVE_FUTURE_DATA',
		4: 'HAVE_ENOUGH_DATA'
	},
	NETWORK_STATE: {
		NETWORK_EMPTY: 0,
		NETWORK_IDLE: 1,
		NETWORK_LOADING: 2,
		NETWORK_NO_SOURCE: 3,
		0: 'NETWORK_EMPTY',
		1: 'NETWORK_IDLE',
		2: 'NETWORK_LOADING',
		3: 'NETWORK_NO_SOURCE'
	}
};